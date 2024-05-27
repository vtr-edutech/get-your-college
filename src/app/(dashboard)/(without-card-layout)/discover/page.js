import AdvertBanner from "@/components/AdvertBanner";
import Announcements from "@/components/Announcements";
import CutoffCalculator from "@/components/CutoffCalculator";
import Image from "next/image";
import React from "react";
import { GrAnnounce } from "react-icons/gr";

const Discover = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex md:flex-row flex-col gap-4'>
        {/* Updates div */}
        <div className='flex flex-col p-6 gap-3 min-w-[30%] md:max-w-md rounded-md shadow-sm shadow-black/10 bg-white'>
          <h1 className='font-semibold text-xl'>Cutoff Calculator</h1>
          Calculate your cutoff with Physics, Chemistry and Math marks
          <CutoffCalculator />
        </div>

        {/* Topics div */}
        <div className='flex flex-col p-3 md:p-6 flex-1 gap-2 rounded-md shadow-sm shadow-black/10 bg-white relative'>
          <h1 className='font-semibold text-xl'>Notifications</h1>
          <h1 className='inline-flex gap-2'>
            <GrAnnounce size={24} />
            Connect with any of our socials to get latest updates{" "}
          </h1>
          <Announcements />
          <div className='w-full absolute bottom-1 left-0 bg-gradient-to-b to-white from-transparent h-16 md:h-20'></div>
        </div>
      </div>

      {/* News */}
      <div className='flex flex-col rounded-md bg-white shadow-sm shadow-black/10 w-full p-6'>
        <h1 className='font-semibold text-xl'>News</h1>
        Connect with any of our socials to get latest updates
        {/* Invisible div for height */}
        <AdvertBanner />
        <div className='flex h-64 w-full relative justify-center'>
        </div>
      </div>

      {/* Flaoting socials */}
    </div>
  );
};

export default Discover;
