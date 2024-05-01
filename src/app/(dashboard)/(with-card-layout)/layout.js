'use client'
import ContentCard from "@/components/ContentCard";
import Navbar from "@/components/Navbar";
import React, { Suspense, useEffect, useMemo } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Combobox, Modal, useCombobox } from '@mantine/core';
import RegisterForm from "@/components/RegisterForm";
import NavBarLoader from "@/components/NavBarLoader";
import { signOut } from "next-auth/react";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { useUserInfo } from "@/utils/hooks";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { COLLEGE_CATEGORIES } from "@/utils/nav_data";
import { selectCategory } from "@/store/collegeCategorySlice";

const RootLayout = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [logoutOpened, logoutHandlers] = useDisclosure(false);
  const { loading, userInfo } = useUserInfo();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Interval being checked");
      if (!loading && (!userInfo.firstName || !userInfo.registerNo)) {
        toast.info("Please continue to register your details so we could guide you better!");
        open();
      }
    }, 1000 * 60);

    return () => clearInterval(interval)
  },[userInfo, loading]);

  const dispatch = useDispatch();
  const selectedCollegeCategory = useSelector((state) => state.collegeCategory);

  const collegeCategorySelect = useCombobox({
    onDropdownClose: () => collegeCategorySelect.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      eventSource == "keyboard"
        ? collegeCategorySelect.selectActiveOption()
        : collegeCategorySelect.updateSelectedOptionIndex("active");
    },
  });

  const collegeCategoryDisplay = useMemo(
    () => COLLEGE_CATEGORIES.find((c) => c.value === selectedCollegeCategory),
    [selectedCollegeCategory]
  );

  return (
    <main className='flex min-h-screen justify-center w-full relative md:pt-12 p-2 pt-12 md:pb-0 pb-16 md:pl-80 md:pr-12'>
      <div className='md:hidden fixed z-50 top-0 left-1/2 -translate-x-[50%] w-56 bg-transparent px-5 h-0'>
        <Combobox
          store={collegeCategorySelect}
          resetSelectionOnOptionHover
          withinPortal={false}
          withArrow
          shadow='md'
          transitionProps={{
            transition: "pop",
          }}
          onOptionSubmit={(v) => {
            dispatch(selectCategory(v));
            collegeCategorySelect.updateSelectedOptionIndex("active");
            collegeCategorySelect.closeDropdown();
          }}
          styles={{
            width: "70%",
          }}
        >
          <Combobox.Target targetType='button'>
            <button
              className='w-56 flex gap-2 absolute top-0 left-1/2 -translate-x-[50%]
                        border-t-[2.8rem] border-t-gray-50
                        border-r-[0.8rem] border-r-transparent
                        border-l-[0.8rem] border-l-transparent
                        border-b-[4rem] border-b-transparent  collge-type-selector'
              onClick={() => collegeCategorySelect.toggleDropdown()}
            >
              <span className='flex gap-2 items-center absolute -top-[4vh] left-1/2 -translate-x-[50%]'>
                {collegeCategoryDisplay.icon}
                {collegeCategoryDisplay.name}
                <Combobox.Chevron />
              </span>
            </button>
          </Combobox.Target>
          <Combobox.Dropdown
            styles={{
              dropdown: {
                position: "absolute",
                top: "3rem",
                width: "60%",
              },
            }}
          >
            <Combobox.Options>
              {COLLEGE_CATEGORIES.filter(
                (cateogry) => cateogry.value !== selectedCollegeCategory
              ).map((cateogry, j) => (
                <Combobox.Option
                  disabled={cateogry.disabled}
                  className='flex items-center gap-2 text-balance'
                  key={Math.random()}
                  value={cateogry.value}
                  active={cateogry.value === selectedCollegeCategory}
                >
                  {cateogry.icon}
                  {cateogry.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </div>
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
        title='Edit User Information'
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
        title='Are you sure to logout?'
      >
        <div className='flex items-center'>
          <button
            className='px-6 py-1.5 rounded-md bg-red-500 text-red-50'
            onClick={signOut}
          >
            Yes
          </button>
          <button
            className='px-4 py-2 rounded-md outline-1 outline-stone-300 text-gray-800'
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
