'use client'
import Navbar from "@/components/Navbar";
import React, { Suspense } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import RegisterForm from "@/components/RegisterForm";
import NavBarLoader from "@/components/NavBarLoader";
import { signOut } from "next-auth/react";

const RootLayout = ({ children }) => {
const [opened, { open, close }] = useDisclosure(false);
const [logoutOpened, logoutHandlers] = useDisclosure(false);
  return (
    <main className='flex flex-col min-h-screen gap-4 w-full relative md:pt-12 p-2 md:pb-0 pb-12 md:pl-80 md:pr-12'>
      <Suspense fallback={<NavBarLoader />}>
        <Navbar modalOpen={open} logoutOpen={logoutHandlers.open} />
      </Suspense>
      {children}
      <Modal opened={opened} onClose={close} key={'ihusa'} title="Edit User Information" centered>
        <RegisterForm closeFn={close} />
      </Modal>
      <Modal opened={logoutOpened} key={'asdaf'} onClose={logoutHandlers.close} centered title="Are you sure to logout?">
        <div className="flex items-center">
          <button className="px-6 py-1.5 rounded-md bg-red-500 text-red-50" onClick={signOut}>Yes</button>
          <button className="px-4 py-2 rounded-md outline-1 outline-stone-300 text-gray-800" onClick={logoutHandlers.close}>No</button>
        </div>
      </Modal>
    </main>
  );
};

export default RootLayout;
