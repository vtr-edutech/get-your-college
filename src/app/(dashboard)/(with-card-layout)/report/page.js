"use client";
import SkeletonLoader from "@/components/SkeletonLoader";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";

const ReportTable = lazy(() => import("@/components/ReportTable"));

const Report = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    reset
  } = useForm();

  const [searchCriteria, setSearchCriteria] = useState(null);

  useEffect(() => {
    const searchCriteriaFromLS = localStorage.getItem('search');
    if (searchCriteriaFromLS) {
      const searchCriteriaObj = JSON.parse(searchCriteriaFromLS);
      setSearchCriteria(searchCriteriaObj);
      reset({
        MinCutoff: searchCriteriaObj.MinCutoff,
        MaxCutoff: searchCriteriaObj.MaxCutoff,
        Category: searchCriteriaObj.Category
      });
    }
    // if (searchCriteriaFromLS) setSearchCriteria(searchCriteriaFromLS);
    // searchSubmission({ searchCriteria });
  }, [])
  

  const searchSubmission = async (data) => {
    if (Object.keys(data).length !== 0) {
      console.log(data);
      localStorage.setItem('search', JSON.stringify(data));
      if (parseInt(data.MinCutoff) > parseInt(data.MaxCutoff)) {
        setError(
          "MinCutoff",
          {
            type: "validate",
            message: "Starting cutoff should be less than Ending cutoff",
          },
          { shouldFocus: true }
        );
        return
      }
      typeof window !== "undefined" && localStorage.setItem("Cat", data.Category);
      setSearchCriteria(data);
    }
  };

  return (
    <>
      <h1 className='font-medium text-2xl'>
        Let&apos;s get your college preferences right
      </h1>
      <h1 className='font-normal text-base'>
        Search colleges and add to your preference list
      </h1>
      <form
        className='md:flex mt-12 md:w-full md:h-[10vh] md:justify-center md:items-center md:flex-wrap
          grid grid-cols-2 gap-2 md:gap-0 grid-rows-3
        '
        onSubmit={handleSubmit(searchSubmission)}
      >
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
        {/* Category */}
        <div className='flex col-span-2 flex-col gap-1 items-center relative'>
          <select
            name='category'
            defaultValue={"Select"}
            className='bg-card p-2 py-2.5 w-full pr-8 rounded-ee-md rounded-se-md focus:outline-1 focus:outline-gray-200'
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
        <button className='bg-fill-black px-6 md:col-span-[unset] col-span-2 md:w-[unset] w-full justify-center py-1.5 text-lg rounded flex gap-2 text-white items-center md:ml-2'>
          <LuSearch />
          Go
        </button>
      </form>

      {searchCriteria?.MinCutoff ? (
        <Suspense fallback={<SkeletonLoader />}>
          <input type="search" name="searchKey" placeholder="Search for college name, branch name, etc." id="search" className="py-2 mt-6 px-3 w-full outline outline-1 outline-gray-300 focus:outline-gray-400 placeholder:text-sm md:outline-gray-200 rounded-md focus:outline-1 md:focus:outline-gray-300" onInput={(e) => setSearchCriteria({...searchCriteria, searchKey: e.currentTarget.value})} />
          <ReportTable searchCriteria={searchCriteria} />
        </Suspense>
      ) : (
        <>
          <div className='flex flex-col self-center mt-6 h-full items-center'>
            <p className='text-sm font-light text-gray-500'>
              Begin search by entering details and Go
            </p>
            <Image
              src={"/reports-illustration.png"}
              width={280}
              height={0}
              className='outline'
              alt='Illustration Search'
            />
          </div>
        </>
      )}
    </>
  );
};

export default Report;
