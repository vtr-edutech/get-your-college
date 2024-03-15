'use client';
import ContentCard from "@/components/ContentCard";
import { ALL_VALID_CATEGORIES } from "@/utils/nav_data";
import { useDebouncedState } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import React, { Suspense, lazy } from "react";

const CollegeInfoTable = lazy(() => import('@/components/CollegeInfoTable'));

const Colleges = () => {
  const currentSubCategoryType = useSearchParams().get('t');
  const [collegeSearchKey, setCollegeSearchKey] = useDebouncedState('', 400);

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
      <input
        type='search'
        onChange={(event) => setCollegeSearchKey(event.currentTarget.value)}
        name='college-search'
        id='search-input'
        placeholder='Search for "sairam", "kundrathur", etc.'
        className='bg-white/60 px-3 py-2 rounded-md focus:outline-1 focus:outline-black/10 border-none shadow-sm'
      />
      <ContentCard>
        <Suspense fallback={'Loading data...'}>
          <CollegeInfoTable searchCriteria={{ searchKey: collegeSearchKey }} />
        </Suspense>
      </ContentCard>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={'Loading...'}>
      <Colleges />
    </Suspense>
  )
};
