"use client";
import ReOrderTable from "@/components/ReOrderTable";
import { dummyPreferenceList } from "@/utils/dummy_data";
import { useMotionValue } from "framer-motion";
import React, { useState } from "react";

const Report = () => {
  const [collegPrefernces, setCollegPrefernces] = useState(dummyPreferenceList);
  const y = useMotionValue(0);

  return (
    <>
      <h1 className='font-medium text-2xl'>
        Let&apos;s get your college preferences right
      </h1>
      <h1 className='font-normal text-base'>
        Feel free to re-order according to your preference
      </h1>
      <input
        type='search'
        name='college-search'
        id='search-input'
        placeholder='Search for colleges to add...'
        className='bg-gray-100 px-3 py-2 rounded-md focus:outline-1 focus:outline-black/10 border-none shadow-sm'
      />
      <div className="flex flex-col">
        <div className='flex justify-around items-center p-4 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200'>
          <h2 className="flex-1">S.No.</h2>
          <h2 className="flex-1">College ID</h2>
          <h2 className="flex-1">College Name</h2>
          <h2 className="flex-1">Website</h2>
        </div>
        <ReOrderTable collegPrefernces={collegPrefernces} setCollegPrefernces={setCollegPrefernces} />
      </div>
    </>
  );
};

export default Report;
