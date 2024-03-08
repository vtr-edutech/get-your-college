import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ RootLayout ~ session:", session)
  if (session) redirect("/home");

  return (
    <main className='flex min-h-screen flex-col items-center justify-center w-full'>
      {children}
    </main>
  );
};

export default RootLayout;
