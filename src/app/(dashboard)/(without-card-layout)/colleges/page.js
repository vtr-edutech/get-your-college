import ContentCard from "@/components/ContentCard";
import React from "react";

const Colleges = () => {
  return (
    <>
      <h1 className='font-medium text-2xl'>
        Search for a college
      </h1>
      <input type="search" name="college-search" id="search-input" placeholder='Search for "sairam", "kundrathur", etc.' className="bg-white/60 px-3 py-2 rounded-md focus:outline-1 focus:outline-black/10 border-none shadow-sm" />
      <ContentCard>
        hi
      </ContentCard>
    </>
  );
};

export default Colleges;
