"use client";
import Image from "next/image";
import React, { Suspense, lazy, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import { UNIQUE_COURSE_NAMES } from '@/utils/collegeData'
import { SegmentedControl, Select } from "@mantine/core";
import SkeletonLoader from "@/components/SkeletonLoader";

const CollegesTable = lazy(() => import("@/components/CollegesTable"));

const Home = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm();
  const yearInputRef = useRef();
  const cutoffCategoryRef = useRef();

  const [searchCriteria, setSearchCriteria] = useState({ cutoffCategory: 'GC', filterBy: 'Cutoff', searchKey: '' });

  console.log("🚀 ~ Home ~ searchCriteria:", searchCriteria)

  const searchSubmission = async (data) => {
    if (Object.keys(data).length !== 0) {
      console.log(data);
      if (parseInt(data.MinCutoff) > parseInt(data.MaxCutoff)) {
        setError(
          "MinCutoff",
          {
            type: "validate",
            message: "Starting cutoff should be less than Ending cutoff",
          },
          { shouldFocus: true }
        );
        setSearchCriteria(null);
        return;
      }
      const chosenYear = yearInputRef.current.value;
      const chosenCutoffCategory = cutoffCategoryRef.current;
      console.log("🚀 ~ searchSubmission ~ chosenCutoffCategory:", chosenCutoffCategory)
      setSearchCriteria({ ...searchCriteria, ...data, year: chosenYear,});
    }
  };

  return (
    <>
      <h1 className='font-medium text-2xl'>
        Let&apos;s get the right college for you
      </h1>
      <h3 className='font-normal text-base'>
        Enter 12th Cut-Off marks and choose Category
      </h3>
      <form
        className='flex flex-col mt-2 md:w-full md:px-28 gap-6 justify-start'
        onSubmit={handleSubmit(searchSubmission)}
      >
        {/* Category and Years container */}
        <div className='flex flex-col md:flex-row gap-2 justify-start items-start md:items-center md:gap-16'>
          {/* Cutoff Category choose */}
          <div className='flex flex-col justify-center gap-1'>
            <p className='font-normal text-sm'>Cutoff category:</p>
            <SegmentedControl
              ref={cutoffCategoryRef}
              withItemsBorders={false}
              styles={{ root: { width: "20rem" } }}
              value={searchCriteria?.cutoffCategory || "GC"}
              onChange={(value) =>
                setSearchCriteria((prev) => ({
                  ...prev,
                  cutoffCategory: value,
                }))
              }
              radius='xs'
              data={[
                {
                  label: "General Cutoff",
                  value: "GC",
                },
                {
                  label: "7.5% Cutoff",
                  value: "SPF",
                },
                {
                  label: "Vocational",
                  value: "VOC",
                },
              ]}
            />
          </div>
          {/* Year choose */}
          <div className='flex flex-col justify-center gap-1'>
            <p className='font-normal text-sm'>Search year:</p>
            <Select
              ref={yearInputRef}
              defaultValue='2023'
              allowDeselect={false}
              checkIconPosition='right'
              styles={{ root: { width: "8rem" } }}
              style={{ fontFamily: "Inter" }}
              onChange={(value) =>
                setSearchCriteria((prev) => ({ ...prev, year: value }))
              }
              data={["2023"]} // for now only year 2023 is available. later add 2021 and 2022 too
            />
          </div>
        </div>

        {/* Linear Search bar */}
        <div className='grid grid-cols-2 grid-rows-2 gap-2 md:flex md:gap-0 md:justify-center md:items-center'>
          {/* Min cutoff */}
          <div className='flex flex-col gap-1 items-center relative'>
            <input
              type='number'
              name='starting-cutoff'
              id='starting-cutoff'
              placeholder='Starting Cut-Off'
              className='bg-card p-2 max-w-44 md:w-44 rounded-ss-md rounded-es-md focus:outline-1 focus:outline-gray-200'
              {...register("MinCutoff", {
                required: { value: true, message: "This field is required" },
                min: {
                  value: 0,
                  message: "Minimum cutoff should be greater than 0",
                },
                max: {
                  value: 200,
                  message: "Minimum cutoff should be less than 200",
                },
              })}
            />
            {errors["MinCutoff"] && (
              <p className='text-xs text-red-500 font-light absolute -top-4 left-0'>
                {errors["MinCutoff"].message}
              </p>
            )}
          </div>
          {/* Max cutoff */}
          <div className='flex flex-col gap-1 items-center relative'>
            <input
              type='number'
              name='ending-cutoff'
              id='ending-cutoff'
              placeholder='Ending Cut-Off'
              className='bg-card p-2 max-w-44 md:w-44 focus:outline-1 focus:outline-gray-200'
              {...register("MaxCutoff", {
                required: { value: true, message: "This field is required" },
                min: {
                  value: 0,
                  message: "Maximum cutoff should be greater than 0",
                },
                max: {
                  value: 200,
                  message: "Maximum cutoff should be less than 200",
                },
              })}
            />
            {errors["MaxCutoff"] && (
              <p className='text-xs text-red-500 font-light absolute -top-4 left-0'>
                {errors["MaxCutoff"].message}
              </p>
            )}
          </div>
          {/* Dept */}
          <div className='grid col-span-2 md:flex md:flex-col md:gap-1 md:items-center relative'>
            <select
              name='category'
              defaultValue={"select"}
              className='bg-card p-2 py-2.5 w-full md:w-52 pr-8 focus:outline-1 focus:outline-gray-200'
              id='category'
              {...register("Dept", {
                required: { value: true, message: "This field is required" },
                validate: (value) =>
                  (value !== "select" && UNIQUE_COURSE_NAMES.includes(value)) ||
                  "Invalid value selected!",
              })}
            >
              <option className='break-words w-52' value='select'>
                Select Department
              </option>
              {UNIQUE_COURSE_NAMES.map((course, i) => (
                <option className='break-words w-52' key={i} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors["Dept"] && (
              <p className='text-xs text-red-500 font-light absolute -top-4 left-0'>
                {errors["Dept"].message}
              </p>
            )}
          </div>
          {/* Category */}
          <div className='grid col-span-2 md:flex md:flex-col md:gap-1 md:items-center relative'>
            <select
              name='category'
              defaultValue={"Select"}
              className='bg-card p-2 py-2.5 pr-8 rounded-ee-md rounded-se-md focus:outline-1 focus:outline-gray-200'
              id='category'
              {...register("Category", {
                required: { value: true, message: "This field is required" },
                validate: (value) =>
                  (value !== "select" &&
                    ["OC", "BC", "BCM", "MBC", "SC", "ST", "SCA"].includes(
                      value
                    )) ||
                  "Invalid value selected!",
              })}
            >
              <option value='select'>Select Category</option>
              <option value='OC'>OC</option>
              <option value='BC'>BC</option>
              <option value='BCM'>BCM</option>
              <option value='MBC'>MBC</option>
              <option value='SC'>SC</option>
              <option value='ST'>ST</option>
              <option value='SCA'>SCA</option>
            </select>
            {errors["Category"] && (
              <p className='text-xs text-red-500 font-light absolute -top-4 left-0'>
                {errors["Category"].message}
              </p>
            )}
          </div>
          <button className='bg-fill-black text-center col-span-2 w-full md:px-6 py-1.5 text-lg rounded flex gap-2 text-white items-center justify-center md:ml-2'>
            <LuSearch />
            <p>Go</p>
          </button>
        </div>
      </form>

      {/* div where table is shown */}
      <div className='flex flex-col h-full w-full gap-4 items-center'>
        {searchCriteria?.MaxCutoff ? (
          <Suspense fallback={<SkeletonLoader />}>
            <div className='flex md:flex-row flex-col w-full mt-6 gap-2 justify-between items-center'>
              <input
                type='search'
                name='searchKey'
                placeholder='Search by college name, college code, etc.'
                id='search'
                className='py-2 px-3 w-full md:w-[50%] outline outline-1 placeholder:text-sm outline-gray-200 rounded-md focus:outline-1 focus:outline-gray-300'
                onInput={(e) =>
                  setSearchCriteria({
                    ...searchCriteria,
                    searchKey: e.currentTarget.value,
                  })
                }
              />
              <input
                type='search'
                name='district'
                placeholder='Search by district'
                id='search-district'
                className='py-2 px-3 w-full md:w-[20%] md:mr-auto outline outline-1 placeholder:text-sm outline-gray-200 rounded-md focus:outline-1 focus:outline-gray-300'
                onInput={(e) =>
                  setSearchCriteria({
                    ...searchCriteria,
                    district: e.currentTarget.value,
                  })
                }
              />
              <SegmentedControl
                label={"Filter By"}
                value={searchCriteria.filterBy}
                styles={{ root: { width: window.innerWidth < 768? "100%": 'unset' } }}
                onChange={(value) =>
                  setSearchCriteria((prev) => ({ ...prev, filterBy: value }))
                }
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
            <CollegesTable searchCriteria={searchCriteria} />
          </Suspense>
        ) : (
          <>
            <p className='text-sm font-light text-gray-500 mt-4'>
              Begin search by entering details and Go
            </p>
            <Image
              src={"/home-illustration.png"}
              width={220}
              height={0}
              className='outline'
              alt='Illustration Search'
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
