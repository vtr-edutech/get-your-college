'use client'
import Navbar from "@/components/Navbar";
import React, { Suspense } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import RegisterForm from "@/components/RegisterForm";

const RootLayout = ({ children }) => {
const [opened, { open, close }] = useDisclosure(false);

  return (
    <main className='flex flex-col min-h-screen gap-4 w-full relative md:pt-12 p-2 md:pb-0 pb-12 md:pl-80 md:pr-12'>
      <Suspense fallback={'Loading...'}>
        <Navbar modalOpen={open} />
      </Suspense>
      {children}
      <Modal opened={opened} onClose={close} title="Edit User Information" centered>
        <RegisterForm />
      </Modal>
    </main>
  );
};

export default RootLayout;
