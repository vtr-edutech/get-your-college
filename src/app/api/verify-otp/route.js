import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { otp } = await req.json();
        await dbConnect();
        const userData = await UserModel.findOne({ mobile: mobile,  })
        return NextResponse.json({ message: 'Verification success' }, { status: 200 })   
    } catch (error) {
        console.log("🚀 ~ verify-otp Error:", error)
        return NextResponse.json({ error: 'Server error in verifying details!' }, { status: 500 })   
    }
}