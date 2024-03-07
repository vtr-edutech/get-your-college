import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJWT } from "./utils";
import { revalidatePath } from "next/cache";

const AUTH_PATHS = [
  '/login',
  '/otp',
  '/register'
];

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    console.log("🚀 ~ middleware ~ pathname:", pathname)

    const actk = cookies().get('actk')?.value;
    // console.log("🚀 ~ Cookies in middleware", actk)

    const cookieData = (actk && (await verifyJWT(actk)));
    console.log("🚀 ~ middleware ~ cookieData:", cookieData?.sub?.id);

    /* If request in any of the auth routes, then check if cookie is valid, if so redirect to home */
    if (AUTH_PATHS.includes(pathname) && !cookieData) {
      return NextResponse.next();
    }

    if (AUTH_PATHS.includes(pathname) && cookieData) {
      // console.log("ACTK inside auth path:", cookieData);
      return NextResponse.redirect(new URL("/home", req.url));
    } 

    if (!cookieData) {
      console.log('tryna redirect homie?');
      req.cookies.delete('actk');
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (cookieData) {
      // headers().set('a')
      req.userId = cookieData.id
    };

    return NextResponse.next();

}

// export const runtime = "edge";

export const config = {
  matcher: [
    "/dashboard",
    "/home",
    "/colleges",
    "/report",
    "/discover",
    "/contact",
    "/login",
    "/otp",
    "/register",
  ],
};