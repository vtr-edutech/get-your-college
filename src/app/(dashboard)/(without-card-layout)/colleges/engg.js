"use client";
import ContentCard from "@/components/ContentCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import { getWindowSize } from "@/utils";
import { ALL_VALID_CATEGORIES } from "@/utils/nav_data";
import { SegmentedControl } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useSelector } from "react-redux";

const CollegeInfoTable = lazy(() => import("@/components/CollegeInfoTable"));

const Colleges = () => {
  const currentSubCategoryType = useSearchParams().get("t");
  const [collegeSearchKey, setCollegeSearchKey] = useDebouncedState("", 400);
  const [filterBy, setFilterBy] = useDebouncedState("Cutoff", 10);

  const [windowSize, setwindowSize] = useState({ width: 1230, height: 1234 });

  const [isPending, startTransition] = useTransition();

  let subcategoryIndex = -1;
  if (currentSubCategoryType)
    subcategoryIndex = ALL_VALID_CATEGORIES.findIndex(
      (category) => currentSubCategoryType == category.value
    );

  const selectedCollegeType = useSelector((state) => state.collegeCategory);

  useEffect(() => {
    setwindowSize(getWindowSize());
  }, []);

  if (!currentSubCategoryType || subcategoryIndex === -1)
    return (
      <ContentCard>
        <h1>Invalid Subcategory Type. Please select a valid type </h1>
      </ContentCard>
    );

  return (
    <>
        <h1 className='font-medium text-2xl'>
            Search for {selectedCollegeType} college in{" "}
            {ALL_VALID_CATEGORIES.at(subcategoryIndex).name}
        </h1>
        <input
            type='search'
            onChange={(event) => setCollegeSearchKey(event.currentTarget.value)}
            name='college-search'
            id='search-input'
            placeholder='Search by College name, College code, Branch name, District'
            className='bg-white px-3 py-2 rounded-md outline outline-1 placeholder:text-sm outline-gray-300 focus:outline-gray-400 md:outline-gray-200 focus:outline-1 md:focus:outline-mantine-blue'
        />
        <ContentCard>
        <Suspense fallback={<SkeletonLoader rows={10} />}>
          <div className='flex w-full justify-end items-center'>
            <SegmentedControl
              label={"Filter By"}
              value={filterBy}
              color='blue'
              styles={{
                root: { width: windowSize.width < 768 ? "100%" : "unset" },
              }}
              onChange={(value) => {
                startTransition(() => {
                  setFilterBy(value);
                });
              }}
              data={[
                {
                  label: "By Cutoff",
                  value: "Cutoff",
                },
                {
                  label: "By Rank",
                  value: "Rank",
                },
              ]}
            />
          </div>
          {isPending ? (
            <SkeletonLoader />
          ) : (
            <CollegeInfoTable
              searchCriteria={{
                searchKey: collegeSearchKey,
                cutoffCategory: "GC",
                filterBy: filterBy,
              }}
            />
          )}
        </Suspense>
      </ContentCard>
    </>
  );
};

export default Colleges;