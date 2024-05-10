"use client";

import Image from "next/image";
import { CgFileDocument, CgLink } from "react-icons/cg";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([
    {
      date: "Monday, 06 May 2024",
      lastDate: "06 June, 2024",
      title: "TAMIL NADU ENGINEERING ADMISSIONS - 2024",
      link: "https://www.tneaonline.org/",
    },
    {
      date: "Monday, 06 May 2024",
      lastDate: "20 May, 2024",
      title: "TAMIL NADU GOVT ARTS AND SCIENCE COLLEGES ADMISSIONS - 2024",
      link: "https://www.tngasa.in/",
    },
    {
      date: "Tuesday, 26 March 2024",
      lastDate: "31 May, 2024",
      title: "CIPET ADMISSION TEST - 2024",
      link: "https://cipet24.onlineregistrationform.org/CIPET/",
    },
    {
      date: "Tuesday, 07 May 2024",
      lastDate: "06 June, 2024",
      title: "TAMIL NADU Dr.J.JAYALALITHAA FISHERIES UNIVERSITY",
      link: "https://tnagfi.ucanapply.com/",
    },
    {
      date: "Tuesday, 07 May 2024",
      lastDate: "06 June, 2024",
      title: "TAMIL NADU AGRICULTURAL UNIVERSITY",
      link: "https://tnagfi.ucanapply.com/",
    },
  ]);

  return announcements.length > 0 ? (
    <div className='flex flex-col gap-2 md:gap-1 md:max-h-[28rem] max-h-72 p-2 overflow-y-scroll relative'>
      {/* Annoucement card */}
      {announcements.map((announcement) => (
        <Link
          href={announcement.link}
          key={Math.random()}
          className='flex gap-4 p-2 bg-white outline outline-1 outline-gray-300 rounded-md'
          target='_blank'
        >
          <div className='grid place-items-center bg-card rounded-md p-3 px-5 md:p-4 md:px-7 aspect-square'>
            <CgLink size={28} color='#228be6' />
          </div>
          <div className='flex flex-col gap-1'>
            {/* date */}
            <p className='text-xs text-gray-600 md:text-[13px] flex gap-1 items-center'>
              <CiCalendarDate size={16} color='#228be6' />
              {announcement.date}
            </p>
            {/* title */}
            <h3 className='text-sm md:text-base'>
              {announcement.title}{" "}
              <br />
              <span className='font-semibold'>
                (Last date: {announcement.lastDate})
              </span>
            </h3>
            {/* link */}
            <p className='text-mantine-blue flex gap-1 md:text-base text-sm items-center'>
              Open <MdOutlineArrowOutward />
            </p>
          </div>
        </Link>
      ))}
      <div className='h-20'></div>
    </div>
  ) : (
    <div className='flex w-full relative justify-center'>
      <Image
        src={"/Empty-pana.png"}
        height={180}
        width={300}
        className='self-center flex p-5'
        quality={95}
        alt='No data placeholder image'
      />
      <p className='text-primary/50 absolute -translate-x-1/2 left-[50%] bottom-2'>
        No data yet!
      </p>
    </div>
  );
}
