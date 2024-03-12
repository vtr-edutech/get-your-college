'use server'
import UserModel from "@/models/UserModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/utils/db";

export async function GET() {
  try {
    await dbConnect();

    const userSession = await getServerSession(authOptions);
    const userId = await userSession?.user?.id;

    if (!userSession || !userId)
      return NextResponse.json(
        { error: "We could not authenticate you, please login again" },
        { status: 403 }
      );

    const userData = await UserModel.findOne({ _id: userId });
    
    if (!userData)
      return NextResponse.json(
        {
          error: "We could not find your registration, please register again!",
        },
        { status: 404 }
      );

    return NextResponse.json(
      { user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error)
    return NextResponse.json(
      { message: "Server error in getting user info. Please try again later." },
      { status: 500 }
    );
  }
}
