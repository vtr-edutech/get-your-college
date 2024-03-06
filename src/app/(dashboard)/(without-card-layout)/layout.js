import Navbar from "@/components/Navbar";
import React from "react";

const RootLayout = ({ children }) => {
  return (
    <main className='flex flex-col min-h-screen gap-4 w-full relative pt-12 pl-80 pr-12'>
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;
