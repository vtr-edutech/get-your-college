'use server'
import UserModel from "@/models/UserModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/utils/db";

export async function POST(req) {
  try {
    const { firstName, lastName, group, gender, email, district, dob, pincode } =
      await req.json();

    const userSession = await getServerSession(authOptions);
    const userId = userSession?.user?.id;
    
    if (!userSession || !userId)
      return NextResponse.json(
        { error: "We could not authenticate you, please login again" },
        { status: 403 }
      );

    console.log(userId);
    
    await dbConnect();

    const userData = await UserModel.findOne({ _id: userId });
    console.log("🚀 ~ POST ~ userData:", userData.mobile, " has updated info")
    if (!userData)
      return NextResponse.json(
        {
          error: "We could not find your registration, please register again!",
        },
        { status: 404 }
      );

    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.distrct = district;
    userData.pincode = pincode;
    userData.dob = dob;
    userData.gender = gender;
    userData.group = group;
    userData.email = email;
    await userData.save();
    
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
