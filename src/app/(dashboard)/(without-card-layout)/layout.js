'use client'
import Navbar from "@/components/Navbar";
import React, { Suspense } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import RegisterForm from "@/components/RegisterForm";
import NavBarLoader from "@/components/NavBarLoader";
import { signOut } from "next-auth/react";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import MobileCategorySelector from "@/components/MobileCategorySelector";
import { DISABLE_AD_BANNER } from "@/constants";

const RootLayout = ({ children }) => {
const [opened, { open, close }] = useDisclosure(false);
const [logoutOpened, logoutHandlers] = useDisclosure(false);
  return (
    <main className={`flex flex-col min-h-screen gap-4 w-full relative ${DISABLE_AD_BANNER? `pt-12`: ''} p-2 md:pb-6 pb-20 md:pl-80 md:pr-12`}>
      <MobileCategorySelector />
      <Suspense fallback={<NavBarLoader />}>
        <Navbar modalOpen={open} transitionProps={{ transition: "pop" }} logoutOpen={logoutHandlers.open} />
      </Suspense>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
      <Modal opened={opened} onClose={close} key={'ihusa'} title="Edit User Information" centered>
        <RegisterForm closeFn={close} />
      </Modal>
      <Modal opened={logoutOpened} transitionProps={{ transition: "pop" }} key={'asdaf'} onClose={logoutHandlers.close} centered title="Are you sure to logout?">
        <div className="flex items-center">
          <button className="px-6 py-1.5 rounded-md bg-red-500 text-red-50" onClick={signOut}>Yes</button>
          <button className="px-4 py-2 rounded-md outline-1 outline-stone-300 text-gray-800" onClick={logoutHandlers.close}>No</button>
        </div>
      </Modal>
    </main>
  );
};

export default RootLayout;
