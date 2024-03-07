import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    cookies().delete('actk');
    return NextResponse.redirect(new URL('/login', req.url));
}