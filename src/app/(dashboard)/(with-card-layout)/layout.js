import ContentCard from "@/components/ContentCard";
import Navbar from "@/components/Navbar";
import React from "react";

const RootLayout = ({ children }) => {
  return (
    <main className='flex min-h-screen justify-center w-full relative pt-12 pl-80 pr-12'>
      <Navbar />
      <ContentCard>
        {children}
      </ContentCard>
    </main>
  );
};

export default RootLayout;
