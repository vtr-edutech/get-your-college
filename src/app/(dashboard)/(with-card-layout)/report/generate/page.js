"use client";
import ReOrderTable from "@/components/ReOrderTable";
import { dummyPreferenceList } from "@/utils/dummy_data";
import React, { useState } from "react";

const Generate = () => {
  const [collegPrefernces, setCollegPrefernces] = useState(dummyPreferenceList);
  return (
    <>
      <h1 className='font-medium text-2xl'>
        Let&apos;s get your college preferences right
      </h1>
      <h1 className='font-normal text-base'>
        Feel free to re-order according to your preference
      </h1>
      {/* Table for Next Page */}
      <div className='flex flex-col mt-6'>
        <div className='flex justify-around items-center p-4 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200'>
          <h2 className='flex-1'>S.No.</h2>
          <h2 className='flex-1'>College ID</h2>
          <h2 className='flex-1'>College Name</h2>
          <h2 className='flex-1'>Website</h2>
        </div>
        <ReOrderTable
          collegPrefernces={collegPrefernces}
          setCollegPrefernces={setCollegPrefernces}
        />
      </div>
    </>
  );
};

export default Generate;
