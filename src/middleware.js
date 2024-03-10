export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home",
    "/report",
    "/report/generate",
    "/colleges",
    "/settings",
    "/contact",
    "/discover",
  ],
};
