import React from "react";

const RootLayout = ({ children }) => {
  return (
    <main className='flex min-h-screen justify-center w-full relative pl-72'>
      {children}
    </main>
  );
};

export default RootLayout;
