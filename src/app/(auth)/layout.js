import React from "react";

const RootLayout = ({ children }) => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center w-full'>
      {children}
    </main>
  );
};

export default RootLayout;
