'use client';
import ContentCard from "@/components/ContentCard";
import { ALL_VALID_CATEGORIES } from "@/utils/nav_data";
import { useSearchParams } from "next/navigation";
import React from "react";

const Colleges = () => {
  const currentSubCategoryType = useSearchParams().get('t');
  let subcategoryIndex = -1;

  if (currentSubCategoryType) subcategoryIndex = ALL_VALID_CATEGORIES.findIndex(
    (category) => currentSubCategoryType == category.value
  );

  if (!currentSubCategoryType || subcategoryIndex === -1) return <h1>Invalid Subcategory Type. Please select a valid type </h1>

  return (
    <>
      <h1 className='font-medium text-2xl'>
        Search for a college in {ALL_VALID_CATEGORIES.at(subcategoryIndex).name}
      </h1>
      <input type="search" name="college-search" id="search-input" placeholder='Search for "sairam", "kundrathur", etc.' className="bg-white/60 px-3 py-2 rounded-md focus:outline-1 focus:outline-black/10 border-none shadow-sm" />
      <ContentCard>
        hi
      </ContentCard>
    </>
  );
};

export default Colleges;
