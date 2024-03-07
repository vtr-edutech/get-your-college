import UserModel from "@/models/UserModel";
import { issueJWT, verifyRegistrationJWT } from "@/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { firstName, lastName, group, gender, email, address } =
      await req.json();
    // console.log(
    //   "🚀 ~ POST ~ firstName, lastName, group, gender, email, address:",
    //   firstName,
    //   lastName,
    //   group,
    //   gender,
    //   email,
    //   address
    // );

    const registrationToken = cookies().get("regtk");
    // console.log("🚀 ~ POST ~ registrationToken:", registrationToken);
    if (!registrationToken)
      return NextResponse.json(
        { error: "We could not verify your registration, please register again" },
        { status: 403 }
      );

    const userId = await verifyRegistrationJWT(registrationToken.value);
    if (userId == null) {
      cookies().delete('regtk');
      return NextResponse.json(
        {
          error: "We could not verify your registration, please register again. You will be redirected shortly",
        },
        { status: 401 }
      );
    }

    console.log(userId);

    const userData = await UserModel.findOne({ _id: userId });
    if (!userData)
      return NextResponse.json(
        {
          error: "We could not find your registration, please register again!",
        },
        { status: 404 }
      );

    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.address = address;
    userData.gender = gender;
    userData.group = group;
    userData.email = email;
    await userData.save();

    const accessToken = await issueJWT(userData._id, userData.firstName);

    cookies().set('actk', accessToken, { httpOnly: true, secure: true });
    cookies().delete('regtk');
    
    return NextResponse.json(
      { message: "Registered succesfully" },
      { status: 200 }
    );

  } catch (error) {
    console.log("🚀 ~ POST ~ error register:", error);
    return NextResponse.json(
      { message: "Server error in registering, please try later!" },
      { status: 500 }
    );
  }
}
