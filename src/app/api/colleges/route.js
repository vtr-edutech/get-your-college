import CollegesModel from "@/models/CollegeModel";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const params = new URL(req.url).searchParams;
        const pageNo = params.get("page");
        const pageSize = params.get("size");
        const searchKey = params.get("search");
        if (!pageNo || !pageSize) {
            return NextResponse.json({ error: "Invalid query params data" }, { status: 429 });
        }
        if (searchKey) {
            /** write mongo query to check college name, college code strings with the searchKey */
            const collegesData = [];
            return NextResponse.json(collegesData, { status: 200 });
        }
        await dbConnect();
        const fetchCollegesData = await CollegesModel.find().skip(parseInt(pageNo) * parseInt(pageSize)).limit(parseInt(pageSize));
        // const fetchCollegesData = await CollegesModel.find().skip(0).limit(parseInt(pageSize));
        return NextResponse.json(fetchCollegesData, { status: 200 });
    } catch (error) {
        console.log("🚀 ~ GET colleges ~ error:", error)
        return NextResponse.json({ error: "Server error in getting colleges data" }, { status: 500 });
    }
} 