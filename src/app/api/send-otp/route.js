import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { mobile } = await req.json();

        console.log(mobile);

        await dbConnect();
        
        // Mock test send invalid number
        if (mobile[0] == '8') return NextResponse.json({ error: 'Nah' }, { status: 403 });
        
        // verify mobile using regex 
        // make a call to twilio

        const userData = await UserModel.findOneAndReplace({ mobile: mobile }, { 
            mobile: mobile,
            lastOTP: '000000'
        }, { new: true, upsert: true });

        console.log(`🚀 ~ user created for ${mobile} `)
        return NextResponse.json({ message: "OTP has been sent!" }, { status: 200 });
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        NextResponse.json({ error: "Server error in sending OTP" }, {status: 500})        
    }
}