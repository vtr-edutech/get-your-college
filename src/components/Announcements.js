"use client";

import Image from "next/image";
import { GrAnnounce } from "react-icons/gr";
import { CgFileDocument } from "react-icons/cg";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  return announcements.length > 0 ? (
    <div className='flex flex-col gap-1 md:max-h-[28rem] max-h-64 p-2 overflow-y-scroll relative'>
      {/* Annoucement card */}
      {announcements.map((announcement) => (
        <div
          key={Math.random()}
          className='flex gap-4 p-2 bg-white outline outline-1 outline-gray-300 rounded-md'
        >
          <div className='grid place-items-center bg-card rounded-md p-3 px-5 md:p-4 md:px-7 aspect-square'>
            <CgFileDocument size={28} />
          </div>
          <div className='flex flex-col gap-1'>
            {/* date */}
            <p className='text-xs text-gray-600 md:text-sm'>{announcement.date}</p>
            {/* title */}
            <h3 className='text-sm md:text-base'>{announcement.title}</h3>
            {/* link */}
            <Link
              href={announcement.link}
              target='_blank'
              className='text-mantine-blue flex gap-1 items-center'
            >
              Open <MdOutlineArrowOutward />
            </Link>
          </div>
        </div>
      ))}
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
