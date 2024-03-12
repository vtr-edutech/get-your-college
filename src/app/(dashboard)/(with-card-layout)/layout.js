'use client'
import ContentCard from "@/components/ContentCard";
import Navbar from "@/components/Navbar";
import React from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import RegisterForm from "@/components/RegisterForm";

const RootLayout = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <main className='flex min-h-screen justify-center w-full relative pt-12 pl-80 pr-12'>
      <Navbar modalOpen={open} />
      <ContentCard>
        {children}
      </ContentCard>
      <Modal opened={opened} onClose={close} title="Edit User Information" centered>
        <RegisterForm />
      </Modal>
    </main>
  );
};

export default RootLayout;
