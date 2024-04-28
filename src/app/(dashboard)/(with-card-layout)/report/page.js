"use client";
import SkeletonLoader from "@/components/SkeletonLoader";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { getWindowSize, inter } from "@/utils";
import { COLLEGE_CATEGORIES } from "@/utils/collegeChoiceListData";
import { ALL_DISTRICT } from "@/utils/collegeDistrictData";
import { COLLEGE_CODE_NAME } from "@/utils/collegeDistrictData";
import { UNIQUE_COURSE_NAMES } from "@/utils/collegeNames";
import { Select } from "@mantine/core";
import Image from "next/image";
import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";

const ReportTable = lazy(() => import("@/components/ReportTable"));

const collegeNameSearchFilter = ({ options, search }) => {
  return options.filter(option => 
    option.label.toLowerCase().replace(/\s+/g, '').includes(
      search.toLowerCase().replace(/\s+/g, '')
    )
  )
}

const COLLEGE_NAMES = COLLEGE_CODE_NAME.map(coll => coll["College Name"])
const COLLEGE_CODES = COLLEGE_CODE_NAME.map(coll => coll["College Code"].toString())

const Report = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    reset
  } = useForm();
  
  const collegeNameRef = useRef()
  const collegeCodeRef = useRef()

  const [searchCriteria, setSearchCriteria] = useState(null);
  const [collegeName, setCollegeName] = useState()
  const [collegeCode, setCollegeCode] = useState()
  const [windowSize, setWindowSize] = useState({ width: 1093, height: 1293 })
  
  console.log("🚀 ~ Report ~ searchCriteria:", searchCriteria)

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

  useEffect(() => setWindowSize(getWindowSize()) ,[])
  

  const searchSubmission = async (data) => {
    console.log("🚀 ~ searchSubmission ~ data:", data)
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
      setSearchCriteria((prev) => ({ ...prev, ...data }));
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
        className='md:flex mt-12 md:mt-7 md:w-full md:h-[10vh] md:justify-center md:items-center md:flex-wrap
          grid grid-cols-2 gap-2 md:gap-3 grid-rows-3
        '
        onSubmit={handleSubmit(searchSubmission)}
      >
        {/* Min cutoff */}
        <div className='flex flex-col gap-1 items-center relative'>
          <p className='font-normal text-sm w-full text-left'>
            Minimum Cut-off:
          </p>
          <input
            type='number'
            name='starting-cutoff'
            id='starting-cutoff'
            placeholder='Starting Cut-Off'
            className='bg-card/10 outline p-2 max-w-44 w-full md:w-[8.5rem] placeholder:text-sm md:mb-0 mb-3 rounded-md outline-1 md:focus:outline-1 focus:outline-2 outline-mantine-blue/50 md:outline-gray-200 focus:outline-mantine-blue'
            defaultValue={70}
            {...register("MinCutoff", {
              required: { value: true, message: "This field is required" },
              min: {
                value: 70,
                message: "Minimum cutoff should be greater than 70",
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
          <p className='font-normal text-sm w-full text-left'>
            Maximum Cut-off:
          </p>
          <input
            type='number'
            name='ending-cutoff'
            id='ending-cutoff'
            placeholder='Ending Cut-Off'
            className='bg-card/10 outline p-2 max-w-44 w-full md:w-[8.5rem] placeholder:text-sm md:mb-0 mb-3 rounded-md outline-1 md:focus:outline-1 focus:outline-2 outline-mantine-blue/50 md:outline-gray-200 focus:outline-mantine-blue/60'
            {...register("MaxCutoff", {
              required: { value: true, message: "This field is required" },
              min: {
                value: 70,
                message: "Maximum cutoff should be greater than 70",
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
          <p className='font-normal text-sm w-full text-left'>Community:</p>
          <select
            name='category'
            defaultValue={"Select"}
            className='bg-card/10 outline p-2 py-2.5 pr-8 md:w-[unset] w-full text-sm rounded-md outline-[0.8px] md:focus:outline-1 focus:outline-2 outline-mantine-blue/50 md:outline-gray-200 placeholder:text-sm focus:outline-mantine-blue/60'
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
        {/* Button */}
        <div className='grid col-span-2 md:flex md:flex-col md:gap-1 md:items-center relative'>
          <p className='font-normal text-sm w-full text-white text-left'>
            &nbsp;
          </p>
          <button className='bg-mantine-blue text-center col-span-2 w-full md:w-fit md:px-6 py-1.5 text-lg rounded flex gap-2 text-white items-center justify-center md:ml-2'>
            <LuSearch />
            <p>Go</p>
          </button>
        </div>
      </form>

      {searchCriteria?.MinCutoff ? (
        <Suspense fallback={<SkeletonLoader />}>
          <div className='flex md:flex-row flex-col md:items-center gap-2 w-full mt-8'>
            <Select
              label="College Name:"
              searchable
              placeholder='Filter by College Name'
              data={COLLEGE_NAMES}
              ref={collegeNameRef}
              value={collegeName}
              onChange={(value) => {
                if (!value) {
                  setCollegeName(null);
                  setCollegeCode(null);
                  return setSearchCriteria((prev) => ({
                    ...prev,
                    CollegeCode: null,
                  }));
                }
                let currentCode = COLLEGE_CODE_NAME.find(
                  (codeName) => codeName["College Name"] == value
                )["College Code"];
                setCollegeCode(currentCode);
                setSearchCriteria((prev) => ({
                  ...prev,
                  CollegeCode: currentCode,
                }));
                setCollegeName(value);
                collegeCodeRef.current.value = currentCode;
              }}
              comboboxProps={{
                withArrow: true,
                shadow: "xl",
              }}
              filter={collegeNameSearchFilter}
              styles={{
                root: {
                  minWidth: windowSize.width < 768? "100%": "50vw",
                },
                label: {
                  fontStyle: inter.style.fontStyle,
                  fontWeight: 400,
                },
                input: {
                  fontFamily: inter.style.fontFamily,
                  paddingTop: "0.55rem",
                  paddingBottom: "0.55rem",
                },
              }}
            />
            <Select
              label="College Code:"
              searchable
              placeholder='Filter by College Code'
              data={COLLEGE_CODES}
              ref={collegeCodeRef}
              value={collegeCode}
              onChange={(value) => {
                if (!value) {
                  setCollegeName(null);
                  setCollegeCode(null);
                  return setSearchCriteria((prev) => ({
                    ...prev,
                    CollegeCode: null,
                  }));
                }
                let currentName = COLLEGE_CODE_NAME.find(
                  (codeName) => codeName["College Code"] == value
                )["College Name"];
                setSearchCriteria((prev) => ({
                  ...prev,
                  CollegeCode: value,
                }));
                setCollegeName(currentName);
                setCollegeCode(value);
                collegeNameRef.current.value = currentName;
              }}
              comboboxProps={{
                withArrow: true,
                shadow: "xl",
              }}
              styles={{
                root: {
                  width: "100%",
                },
                label: {
                  fontStyle: inter.style.fontStyle,
                  fontWeight: 400,
                },
                input: {
                  fontFamily: inter.style.fontFamily,
                  paddingTop: "0.55rem",
                  paddingBottom: "0.55rem",
                },
              }}
            />
          </div>
          <div className='md:grid md:grid-cols-3 md:grid-rows-1 flex flex-col gap-2 md:mt-3 w-full'>
            <Select
              label="Branch Name:"
              searchable
              placeholder='Filter by Branch Name'
              data={UNIQUE_COURSE_NAMES}
              onChange={(value) => {
                setSearchCriteria((prev) => ({
                  ...prev,
                  BranchName: value
                    ? value.replace(/\s+/g, "").toLowerCase()
                    : null,
                }));
              }}
              comboboxProps={{
                withArrow: true,
                shadow: "xl",
              }}
              styles={{
                label: {
                  fontStyle: inter.style.fontStyle,
                  fontWeight: 400,
                },
                input: {
                  fontFamily: inter.style.fontFamily,
                  paddingTop: "0.55rem",
                  paddingBottom: "0.55rem",
                },
              }}
            />
            <Select
              label="District:"
              searchable
              placeholder='Filter by District'
              data={ALL_DISTRICT}
              onChange={(value) => {
                setSearchCriteria(prev => ({ ...prev, District: value }))
              }}
              comboboxProps={{
                withArrow: true,
                shadow: "xl",
              }}
              styles={{
                label: {
                  fontStyle: inter.style.fontStyle,
                  fontWeight: 400,
                },
                input: {
                  fontFamily: inter.style.fontFamily,
                  paddingTop: "0.55rem",
                  paddingBottom: "0.55rem",
                },
              }}
            />
            <Select
              label="College Category:"
              searchable
              placeholder='Filter by College Category'
              data={COLLEGE_CATEGORIES}
              onChange={(value) => {
                setSearchCriteria((prev) => ({
                  ...prev,
                  CollegeCategory: value,
                }));
              }}
              styles={{
                label: {
                  fontStyle: inter.style.fontStyle,
                  fontWeight: 400,
                },
                input: {
                  fontFamily: inter.style.fontFamily,
                  paddingTop: "0.55rem",
                  paddingBottom: "0.55rem",
                },
              }}
              comboboxProps={{
                withArrow: true,
                shadow: "xl",
              }}
            />
          </div>
          <ErrorBoundary>
            <ReportTable searchCriteria={searchCriteria} />
          </ErrorBoundary>
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
