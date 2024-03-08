// import { verifyJWT } from "@/utils";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }) => {
//   const userCookie = cookies().get("actk")?.value;

// //   const pathName = headers().get('next-url');
// //   console.log("🚀 ~ Layout ~ pathName:", pathName)
// //   const pathName2 = headers().get('referer');
// //   console.log("🚀 ~ Layout ~ pathName2:", pathName2)
//   if (!userCookie) redirect('/login');
  
//   const decodedCookie = await verifyJWT(userCookie);
//   console.log(`🚀 ~ Protected ~ decodedCookie::`, decodedCookie?.sub?.id);
//   if (!decodedCookie) {
//     redirect('/login');
//   }

  return <>{children}</>;
};

export default Layout;
