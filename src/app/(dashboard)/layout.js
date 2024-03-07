import { verifyJWT } from "@/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }) => {
  const userCookie = cookies().get("actk")?.value;

  if (!userCookie) redirect('/login');
  
  const decodedCookie = await verifyJWT(userCookie);
  if (!decodedCookie) {
    cookies().delete('actk');
    redirect('/login');
  }

  return <>{children}</>;
};

export default Layout;
