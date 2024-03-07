import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJWT } from "./utils";

const AUTH_PATHS = [
  '/login',
  '/otp',
  '/register'
];

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    console.log(
      `${new Date().toLocaleTimeString()} 🚀 ~ middleware ~ pathname: `,
      pathname
    );

    const actk = cookies().get('actk')?.value;
    console.log(`${new Date().toLocaleTimeString()} 🚀 ~ Cookies in middleware `, actk)

    const cookieData = (actk && (await verifyJWT(actk)));
    console.log(
      `${new Date().toLocaleTimeString()} 🚀 ~ middleware ~ cookieData: `,
      cookieData?.sub?.id
    );

    /* If request in any of the auth routes, then check if cookie is valid, if so redirect to home */
    if (AUTH_PATHS.includes(pathname) && !cookieData) {
      console.log(
        `${new Date().toLocaleTimeString()} auth la actk cookie illa `
      );
      // return NextResponse.next();
      return
    }

    if (AUTH_PATHS.includes(pathname) && cookieData) {
      console.log(
        `${new Date().toLocaleTimeString()} ACTK inside auth path: `,
        cookieData
      );
      return NextResponse.redirect(new URL("/home", req.url));
    } 

    if (!cookieData) {
      console.log(`${new Date().toLocaleTimeString()} tryna redirect homie? `);
      await req.cookies.delete('actk');
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // if (cookieData) {
    //   // headers().set('a')
    //   console.log('aamaa cookie iruku');
    //   req.userId = cookieData.id
    // };

    // return NextResponse.next();
    return

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