"use client";
import ReOrderTable from "@/components/ReOrderTable";
// import { dummyPreferenceList } from "@/utils/dummy_data";
import { useMotionValue } from "framer-motion";
import React, { useState } from "react";
// console.log("🚀 ~ dummyPreferenceList:", dummyPreferenceList)

const Report = () => {
  const [collegPrefernces, setCollegPrefernces] = useState([
    {
      id: 463,
      name: "South Bohan Academy",
      address: "Alderney City",
      website: "https://google.com",
    },
    {
      id: 52,
      name: "East Holland University",
      address: "South Bohan",
      website: "https://google.com",
    },
    {
      id: 404,
      name: "Westdyke College",
      address: "South Bohan",
      website: "https://google.com",
    },
    {
      id: 126,
      name: "Alderney City School",
      address: "Alderney City",
      website: "https://google.com",
    },
    {
      id: 737,
      name: "Middle Park Institute",
      address: "South Bohan",
      website: "https://google.com",
    },
    {
      id: 891,
      name: "Alderney City School",
      address: "Alderney City",
      website: "https://google.com",
    },
    {
      id: 532,
      name: "Middle Park Institute",
      address: "South Bohan",
      website: "https://google.com",
    },
    {
      id: 741,
      name: "East Holland University",
      address: "Westdyke",
      website: "https://google.com",
    },
    {
      id: 598,
      name: "Middle Park Institute",
      address: "Westdyke",
      website: "https://google.com",
    },
    {
      id: 224,
      name: "Middle Park Institute",
      address: "East Holland",
      website: "https://google.com",
    },
  ]);
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
