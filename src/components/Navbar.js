"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  IoSettingsOutline,
  IoBookOutline,
  IoCompassOutline,
} from "react-icons/io5";
import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { LuPhone } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const MENU_ITEMS = [
  {
    name: "DASHBOARD",
    icon: <MdOutlineDashboard />,
    to: "/dashboard",
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
    name: "DISCOVER",
    icon: <IoCompassOutline size={22} />,
    to: "/discover",
  },
  {
    name: "CONTACT",
    icon: <LuPhone strokeWidth={2} />,
    to: "/contact",
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
  const { data: session } = useSession();
  console.log("🚀 ~ Nav ~ session:", session);

  return (
    <div className='flex flex-col h-screen items-center w-72 bg-white fixed top-0 left-0'>
      {/* Profile Section */}
      <div className='flex flex-col gap-4 justify-center items-center p-10 w-full'>
        <div className='grid place-items-center w-20 h-20'>
          <Image
            src={"/profile-1.png"}
            alt='profile image'
            width={200}
            height={200}
          />
        </div>
        <div className='flex gap-2 items-center'>
          <h4>Hi, {session?.user?.name || 'User'}</h4>
          <Link href={"/settings"}>
            <IoSettingsOutline className='text-black' />
          </Link>
        </div>
      </div>

      <Vr />

      {/* Menu Section */}
      <div className='flex flex-col gap-1 py-8 w-full'>
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
