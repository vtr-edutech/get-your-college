import { SMS_API_KEY, SMS_FROM } from "@/constants";
import UserModel from "@/models/UserModel";
import { generateOTP } from "@/utils";
import dbConnect from "@/utils/db";
import axios from "axios";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { mobile } = await req.json();
        await dbConnect();
        
        if (!(/^[6-9]\d{9}$/.test(mobile))) return NextResponse.json({ error: 'Invalid mobile number' }, { status: 403 });
        
        const randomNumber = generateOTP();
        const smsRequest = await axios.get(
          `https://sms.textmysms.com/app/smsapi/index.php?key=${SMS_API_KEY}&campaign=0&routeid=13&type=text&contacts=${mobile}&senderid=${SMS_FROM}&msg=${encodeURIComponent(`GetYourCollege OTP for login is ${randomNumber} Hexcon`)}`
        );
        console.log("🚀 ~ POST ~ smsRequest:", smsRequest.data, " for ", mobile);

        if (!smsRequest.data.startsWith("SMS-SHOOT-ID")) {
          return NextResponse.json({ error: "Server error in sending OTP" }, { status: 500 });
        }

        const userData = await UserModel.findOneAndUpdate({ mobile: mobile }, { 
            mobile: mobile,
            lastOTP: randomNumber
        }, { new: true, upsert: true });

        return NextResponse.json({ message: "OTP has been sent!" }, { status: 200 });
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error.data ?? error)
        return NextResponse.json({ error: "Server error in sending OTP" }, {status: 500})        
    }
}