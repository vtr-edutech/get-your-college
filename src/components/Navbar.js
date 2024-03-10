"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import {
  IoSettingsOutline,
  IoBookOutline,
  IoCompassOutline,
} from "react-icons/io5";
import { MdLogout, MdOutlineEngineering } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { LuPhone } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FaBookMedical } from "react-icons/fa6";
import { Combobox, Skeleton, useCombobox } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "@/store/collegeCategorySlice";

const MENU_ITEMS = [
  {
    name: "DISCOVER",
    icon: <IoCompassOutline size={22} />,
    to: "/discover",
  },
  {
    name: "SEARCH",
    icon: <GoSearch strokeWidth={0.4} />,
    to: "/home",
  },
  {
    name: "COLLEGES",
    icon: <IoBookOutline />,
    to: "/colleges",
  },
  {
    name: "REPORT",
    icon: <TbReportAnalytics strokeWidth={2} size={18} />,
    to: "/report",
  },
  {
    name: "CONTACT",
    icon: <LuPhone strokeWidth={2} />,
    to: "/contact",
  },
];

/* 
  Once real data is given, replace the following data with the ones they give, and make sure whatever value is given in any of the following
  fields, the same is also followed when saving in MongoDB
*/
const COLLEGE_CATEGORIES = [
  {
    name: "Engineering",
    value: "engineering",
    icon: <MdOutlineEngineering />,
    subcategories: [
      {
        name: "JEE Mains",
        value: "jee-mains",
      },
      {
        name: "Category X",
        value: "cat-x",
      },
    ],
  },
  {
    name: "Medical",
    value: "medical",
    icon: <FaBookMedical size={16} />,
    subcategories: [
      {
        name: "Category-Y",
        value: "cat-y",
      },
      {
        name: "Category Z",
        value: "cat-z",
      },
      {
        name: "Category A",
        value: "cat-a",
      },
    ],
  },
];

const Vr = ({ mt }) => {
  return (
    <div
      className={`w-full bg-black/40 h-[1px] opacity-60 ${mt && "mt-auto"}`}
    ></div>
  );
};

const Navbar = () => {
  const currentPathName = usePathname();
  const { data: session, status: hasSessionLoaded } = useSession();
  console.log("🚀 ~ Nav ~ session:", session);
  // const [selectedCollegeCategory, setSelectedCollegeCategory] = useState("engineering"); // soon change this to redux global state and use dispatch to update states and read from it
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
    <div className='flex flex-col h-screen items-center w-72 bg-white fixed top-0 left-0'>
      {/* Profile Section */}
      <div className='flex flex-col gap-4 justify-center items-center p-10 w-full'>
        <div className='grid place-items-center w-20 h-20'>
          <Skeleton visible={hasSessionLoaded === "loading"} circle>
            <Image
              src={session?.user?.image || "/profile-1.png"}
              alt='profile image'
              width={200}
              height={200}
            />
          </Skeleton>
        </div>
        <div className='flex gap-2 items-center justify-center '>
          <Skeleton
            visible={hasSessionLoaded === "loading"}
            radius={5}
            // height={24}
            // width={86}
          >
            <h4 className="text-ellipsis w-fit">Hi, {session?.user?.name || 'User'}</h4>
          </Skeleton>
          <Link href={"/settings"}>
            <IoSettingsOutline className='text-black' />
          </Link>
        </div>
      </div>

      <Vr />

      {/* College Type selection */}
      <div className='p-1 mt-3 grid place-items-center'>
        <Combobox
          store={collegeCategorySelect}
          resetSelectionOnOptionHover
          dropdownPadding={2}
          withinPortal={false}
          onOptionSubmit={(v) => {
            dispatch(selectCategory(v));
            collegeCategorySelect.updateSelectedOptionIndex("active");
            collegeCategorySelect.closeDropdown();
          }}
          styles={{
            width: "80%",
          }}
        >
          <Combobox.Target targetType='button'>
            <button
              className='w-48 outline outline-1 outline-gray-100 rounded-sm bg-gray-100 p-2 flex justify-between items-center'
              onClick={() => collegeCategorySelect.toggleDropdown()}
            >
              <span className='flex gap-2 items-center'>
                {collegeCategoryDisplay.icon}
                {collegeCategoryDisplay.name}
              </span>
              <Combobox.Chevron />
            </button>
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>
              {COLLEGE_CATEGORIES.filter(
                (cateogry) => cateogry.value !== selectedCollegeCategory
              ).map((cateogry, i) => (
                <Combobox.Option
                  className='flex items-center gap-2'
                  key={i}
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

      {/* Menu Section */}
      <div className='flex flex-col gap-1 py-4 w-full'>
        {MENU_ITEMS.map((menu, i) => (
          <Link
            key={i}
            href={menu.to}
            prefetch={false}
            className={`font-medium flex gap-2 items-center pl-4 py-4 ml-10 ${
              currentPathName == menu.to
                ? "bg-blue-50 rounded-s-md shadow-sm shadow-black/30"
                : ""
            }`}
          >
            {menu.icon}
            {menu.name}
          </Link>
        ))}
      </div>

      <Vr mt />

      {/* Logout */}
      <div className='flex p-5 items-center'>
        <button
          onClick={() => signOut()}
          className='flex gap-2 items-center text-red-400 font-medium'
        >
          <MdLogout size={18} />
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Navbar;
