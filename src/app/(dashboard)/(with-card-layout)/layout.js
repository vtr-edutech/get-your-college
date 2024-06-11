"use client";
import ContentCard from "@/components/ContentCard";
import Navbar from "@/components/Navbar";
import React, { Suspense, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import RegisterForm from "@/components/RegisterForm";
import NavBarLoader from "@/components/NavBarLoader";
import { signOut } from "next-auth/react";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { useUserInfo } from "@/utils/hooks";
import { toast } from "react-toastify";
import MobileCategorySelector from "@/components/MobileCategorySelector";

const RootLayout = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [logoutOpened, logoutHandlers] = useDisclosure(false);

  const { loading, userInfo } = useUserInfo();

  useEffect(() => {
    let interval;

    const intervalFunc = () => {
      console.log("Interval being checked");
      if (!loading && (!userInfo.firstName || !userInfo.registerNo)) {
        toast.info(
          "Please continue to register your details so we could guide you better!",
        );
        open();
      } else {
        // console.log("Stopping interval as user data is present");
        clearInterval(interval);
      }
    };

    interval = setInterval(intervalFunc, 1000 * 60 * 2);

    return () => clearInterval(interval);
  }, [userInfo, loading]);

  return (
    <main className="relative flex min-h-screen w-full justify-center p-2 pb-16 pt-12 md:pb-0 md:pl-80 md:pr-12">
      <MobileCategorySelector />
      <Suspense fallback={<NavBarLoader />}>
        <Navbar modalOpen={open} logoutOpen={logoutHandlers.open} />
      </Suspense>
      <ErrorBoundary>
        <ContentCard>{children}</ContentCard>
      </ErrorBoundary>
      <Modal
        opened={opened}
        transitionProps={{ transition: "pop" }}
        onClose={close}
        key={"ihusa"}
        title="Edit User Information"
        centered
      >
        <RegisterForm closeFn={close} />
      </Modal>
      <Modal
        opened={logoutOpened}
        transitionProps={{ transition: "pop" }}
        key={"asdaf"}
        onClose={logoutHandlers.close}
        centered
        title="Are you sure to logout?"
      >
        <div className="flex items-center">
          <button
            className="rounded-md bg-red-500 px-6 py-1.5 text-red-50"
            onClick={signOut}
          >
            Yes
          </button>
          <button
            className="rounded-md px-4 py-2 text-gray-800 outline-1 outline-stone-300"
            onClick={logoutHandlers.close}
          >
            No
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default RootLayout;
