import UserModel from "@/models/UserModel";
import { issueJWT, issueRegistrationJWT } from "@/utils";
import dbConnect from "@/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
      const { otp, mobile } = await req.json();

      await dbConnect();

      const userData = await UserModel.findOne({
        mobile: mobile,
        lastOTP: otp,
      });
      if (!userData)
        return NextResponse.json(
          { error: "Verification failed: Invalid OTP" },
          { status: 403 }
        );

      if (userData.isMobileVerified == true && userData.firstName) {
        // mobile has already been verified, then they have gone to registration page but not completed
        /* if mobile already verified and firstName and stuff is available, then we know they are registered. 
                hence issue JWT in cookie and redirect to dashboard
            */
        const accToken = await issueJWT(userData._id, userData.firstName);
        console.log('loggin in existing user');
        cookies().set("actk", accToken, { httpOnly: true, secure: true });
        // return NextResponse.redirect(new URL("/home", req.url));
        return NextResponse.json({ message: 'Logged in Succesfully' }, { status: 200 });
        /* check in register page if cookie is there in layout.js, if so, decode it and check if session is valid
                and redirect to home page. but if not cookie, 
            */
        // handle login instead of registration if user had already registered
        // maybe issue a cookie and redirect to dashboard instead (which is /home)
      }

      userData.isMobileVerified = true;
      await userData.save();
      
      /* issue a brand new JWT JUST for signup where userId is signed and sent to user as cookie. 
      in /api/register, read the cookie, verify it, and take userId from it.
      with that userId, query mongo if userId is there, or else, popup invalid user and yeet them out
      or else, save that data with that userId
      */
     const regToken = await issueRegistrationJWT(userData._id);
     cookies().set('regtk', regToken, { httpOnly: true, secure: true });
     console.log('regtk given and gona redir');
     return NextResponse.redirect(new URL('/register', req.url), { status: 302 });

    } catch (error) {
        console.log("🚀 ~ verify-otp Error:", error)
        return NextResponse.json({ error: 'Server error in verifying details!' }, { status: 500 })   
    }
}