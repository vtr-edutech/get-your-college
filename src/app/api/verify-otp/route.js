import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server"

export async function POST(req) {
    let isSuccess = false;

    try {
        const { otp, mobile } = await req.json();
        
        await dbConnect();

        const userData = await UserModel.findOne({ mobile: mobile, lastOTP: otp });
        if (!userData) return NextResponse.json(
          { error: "Verification failed" },
          { status: 403 }
        );

        if (userData.isMobileVerified == true) {
            // handle login instead of registration if user had already registered
            // maybe issue a cookie and redirect to dashboard instead (which is /home)
        }

        userData.isMobileVerified = true;
        await userData.save();
        isSuccess = true;

    } catch (error) {
        console.log("🚀 ~ verify-otp Error:", error)
        return NextResponse.json({ error: 'Server error in verifying details!' }, { status: 500 })   
    }
    isSuccess && redirect('/register');
}