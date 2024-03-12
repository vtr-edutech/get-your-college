'use client'
import ContentCard from "@/components/ContentCard";
import Navbar from "@/components/Navbar";
import React, { Suspense } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import RegisterForm from "@/components/RegisterForm";

const RootLayout = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <main className='flex min-h-screen justify-center w-full relative pt-12 pl-80 pr-12'>
      <Suspense fallback={'Loading...'}>
        <Navbar modalOpen={open} />
      </Suspense>
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
