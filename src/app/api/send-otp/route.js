import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { mobile } = await req.json();

        console.log(mobile);
        if (mobile[0] == '8') return NextResponse.json({ error: 'Nah' }, { status: 403 });
        // verify mobile
        // make a call to twilio
        return NextResponse.json({ message: "OTP has been sent!" }, { status: 200 });
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        NextResponse.json({ error: "Server error in sending OTP" }, {status: 500})        
    }
}