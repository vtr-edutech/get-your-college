import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJWT } from "./utils";
import {
  ResponseCookies,
  RequestCookies,
} from "next/dist/server/web/spec-extension/cookies";

const AUTH_PATHS = [
  '/login',
  '/otp',
  '/register'
];


/**
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 */
function applySetCookie(req, res) {
  // parse the outgoing Set-Cookie header
  const setCookies = new ResponseCookies(res.headers);
  // Build a new Cookie header for the request by adding the setCookies
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  // set “request header overrides” on the outgoing response
  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === "x-middleware-override-headers" ||
      key.startsWith("x-middleware-request-")
    ) {
      res.headers.set(key, value);
    }
  });
}

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    console.log(
      ` ------------>   ${new Date().toLocaleTimeString()} 🚀 Path Name:`,
      pathname
    );

    const actk = cookies().get('actk')?.value;
    console.log(` ------------>   ${new Date().toLocaleTimeString()} 🚀 ~ Cookies in middleware:`, actk);

    const cookieData = (actk && (await verifyJWT(actk)));
    console.log(
      ` ------------>   ${new Date().toLocaleTimeString()} 🚀 Decoded cookie User ID:`,
      cookieData?.sub?.id
    );

    /* If request in any of the auth routes, then check if cookie is valid, if so redirect to home */
    if (AUTH_PATHS.includes(pathname) && !cookieData) {
      console.log(
        ` ------------>   ${new Date().toLocaleTimeString()} Inside auth route, no cookie at all `
      );
      const res =  NextResponse.next();
      applySetCookie(req, res);
      return res;
    }

    if (AUTH_PATHS.includes(pathname) && cookieData) {
      console.log(
        ` ------------>   ${new Date().toLocaleTimeString()} Cookie present in auth route, redirecting to home: `,
        cookieData
      );
      const res = NextResponse.redirect(new URL("/home", req.url));
      applySetCookie(req, res);
      return res;
    } 

    if (!cookieData) {
      console.log(` ------------>   ${new Date().toLocaleTimeString()} No cookies or invalid cookie in protected route, going to login `);
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete('actk');
      applySetCookie(req, res);
      return res;
    }

    // const res = NextResponse.next();
    // applySetCookie(req, res);
    // return res;
    return NextResponse.next();
}

// export const runtime = "edge";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};