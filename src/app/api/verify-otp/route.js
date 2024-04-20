import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { mobile, otp } = await req.json();

    await dbConnect();

    // Mock test send invalid number
    if (!/^[6-9]\d{9}$/.test(mobile))
      return NextResponse.json(
        { error: "Invalid mobile number" },
        { status: 403 }
      );
      
    const userData = await UserModel.findOne({ mobile: mobile });
    
    if (userData.lastOTP !== otp) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: "OTP has been verified!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ verify otp ~ error:", error);
    return NextResponse.json(
      { error: "Server error in verifying OTP" },
      { status: 500 }
    );
  }
}
