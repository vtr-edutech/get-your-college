import React from "react";
// import { verifyJWT } from "@/utils";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

const RootLayout = async ({ children }) => {
  // const userCookie = cookies().get("actk")?.value;

  // const decodedCookie = await verifyJWT(userCookie);
  // console.log("🚀 ~ Auth ~ decodedCookie:", decodedCookie)
  // if (decodedCookie) {
  //   console.log('going to home');
  //   redirect("/home");
  // }
  
  return (
    <main className='flex min-h-screen flex-col items-center justify-center w-full'>
      {children}
    </main>
  );
};

export default RootLayout;
