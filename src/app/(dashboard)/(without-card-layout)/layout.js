'use client'
import Navbar from "@/components/Navbar";
import React from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import RegisterForm from "@/components/RegisterForm";

const RootLayout = ({ children }) => {
const [opened, { open, close }] = useDisclosure(false);

  return (
    <main className='flex flex-col min-h-screen gap-4 w-full relative pt-12 pl-80 pr-12'>
      <Navbar modalOpen={open} />
      {children}
      <Modal opened={opened} onClose={close} title="Edit User Information" centered>
        <RegisterForm />
      </Modal>
    </main>
  );
};

export default RootLayout;
