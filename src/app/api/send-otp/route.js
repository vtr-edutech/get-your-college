import { SMS_API_KEY, SMS_FROM } from "@/constants";
import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/db";
import axios from "axios";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { mobile } = await req.json();

        console.log(mobile);

        await dbConnect();
        
        // Mock test send invalid number
        if (mobile[0] == '8') return NextResponse.json({ error: 'Nah' }, { status: 403 });
        
        // verify mobile using regex 
        const smsRequest = await axios.post(
          "http://sms.textmysms.com/app/smsapi/index.php",
          {
            key: SMS_API_KEY,
            campaign: 0,
            routeid: 13,
            type: "text",
            contacts: '+919362667920',
            senderid: SMS_FROM,
            msg: encodeURIComponent(`Your OTP for Get Your College Login is 238742`),
          }
        );
        console.log("🚀 ~ POST ~ smsRequest:", smsRequest)

        const userData = await UserModel.findOneAndUpdate({ mobile: mobile }, { 
            mobile: mobile,
            lastOTP: '000000'
        }, { new: true, upsert: true });

        return NextResponse.json({ message: "OTP has been sent!" }, { status: 200 });
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        return NextResponse.json({ error: "Server error in sending OTP" }, {status: 500})        
    }
}