"use server";
import UserModel from "@/models/UserModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/utils/db";

export async function POST(req) {
  try {
    const {
      firstName,
      lastName,
      group,
      gender,
      email,
      district,
      dob,
      pincode,
      BOS,
      registerNo,
    } = await req.json();

    const userSession = await getServerSession(authOptions);
    const userId = userSession?.user?.id;
    console.log("🚀 ~ userinfo registering attempt for userId:", userId)

    if (!userSession || !userId)
      return NextResponse.json(
        { error: "We could not authenticate you, please login again" },
        { status: 403 }
      );

    console.log(userId);

    await dbConnect();

    const userData = await UserModel.findOne({ _id: userId });
    if (!userData)
      return NextResponse.json(
        {
          error: "We could not find your registration, please logout and login again!",
        },
        { status: 404 }
      );
    console.log("🚀 ~ user Id:", userData._id, " - ",  userData.mobile, " has request update");

    /* Im not reallly gonna validate this field because it can be any value, so i trust client to send only valid data */
    // if (!["TN", "CBSE", "ICSE", "AP"].includes(BOS.trim())) {
    //   return NextResponse.json(
    //     {
    //       error: "Invalid Board of Study!",
    //     },
    //     { status: 403 }
    //   );
    // }
    // Yet again, same situation as above, no need to verify then
    // if (!["101", "102", "103", "104", "105", "106"].includes(group.trim())) {
    //   return NextResponse.json(
    //     {
    //       error: "Invalid Group!",
    //     },
    //     { status: 403 }
    //   );
    // }

    /* reference
     *  ["101", "102", "103", "104", "105", "106", "000"]
     *  101 - PHY |CHE |STATS |MATHS
        102 - PHY |CHE |COMP SCI |MATHS.
        103 - PHY |CHE |BIO |MATHS
        104 - PHY |CHE |BIO-CHEM |MATHS
        105 - PHY |CHE |EEC |MATHS
        106 - PHY |CHE |MATHS | HOME SCI |
     */

    userData.firstName = firstName?.trim();
    userData.lastName = lastName?.trim();
    userData.district = district?.trim();
    userData.pincode = pincode?.trim();
    userData.dob = dob;
    userData.gender = gender?.trim();
    userData.group = group?.trim();
    userData.email = email?.trim();
    userData.boardOfStudy = BOS?.trim();
    userData.registerNo = registerNo?.trim();

    await userData.save({ validateBeforeSave: false });
        console.log(
          "🚀 ~ user Id:",
          userData._id,
          " - ",
          userData.mobile,
          " has updated info"
        );

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
