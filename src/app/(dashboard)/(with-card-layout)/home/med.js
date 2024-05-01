"use client";

import SkeletonLoader from "@/components/SkeletonLoader";
import { getWindowSize, inter, tw } from "@/utils";
import {
  MultiSelect,
  SegmentedControl,
  Select,
  useCombobox,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useTour } from "@reactour/tour";
import Image from "next/image";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";

const COUNSELLING_CATEGORY = {
    "STATE": [
        "TN-GQ 92.5",
        "TN-GQ 7.5",
        "TN-MQ General",
        "TN-MQ Telugu Minority",
        "TN-MQ Christian Minority",
        "TN-MQ Malayalam",
        "TN-MQ NRI",
        "TN-MQ NRI Lapsed",
    ],
    "MCC": [
        "AIQ",
        "Deemed"
    ]
}

const COMMUNITY = {
  "STATE": ["OC", "BC", "BCM", "MBC & DNC", "SC", "SCA",	"ST"],
  "MCC": ["OC", "OBC", "SC", "ST", "EWS"]
}

const MedicalCutoffTable = lazy(() => import("@/components/tables/MedicalCollegeCutoffTable"));

export default function Med() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
    getValues,
    clearErrors,
  } = useForm();

  const stateInputRef = useRef();
  const cutoffCategoryRef = useRef();
  
  const [windowSize, setwindowSize] = useState({ width: 1230, height: 1234 });

  const { setIsOpen, setCurrentStep, isOpen } = useTour();
  const [hasMedicalTourPlayed, setHasMedicalTourPlayed] = useLocalStorage({ key: "hasMedicalPlayed", defaultValue: false })

  const [searchCriteria, setSearchCriteria] = useState({
    counsellingCategory: "STATE",
    state: "TN",
    year: "2023",
    searchKey: "",
    districtKey: "",
    filterBy: "NEET Mark"
  });

  useEffect(() => {
    const hasMedicalTourPlayed = localStorage.getItem("hasMedicalPlayed");
    if ((!hasMedicalTourPlayed || hasMedicalTourPlayed != "true") && !isOpen) {
      setCurrentStep(3);
      setIsOpen(true);
    }
  }, [])

  useEffect(() => {
    setwindowSize(getWindowSize());
  }, []);

   const searchSubmission = async (data) => {
     console.log("submit data", data);
     if (Object.keys(data).length !== 0) {
       if (parseInt(data.MinNEET) > parseInt(data.MaxNEET)) {
         setError(
           "MinNEET",
           {
             type: "validate",
             message: "Minimum NEET score should be less than Maximum NEET score",
           },
           { shouldFocus: true }
         );
         return;
       }
       setSearchCriteria({ ...searchCriteria, ...data });
       console.log(searchCriteria);
     }
   };

  return (
    <>
      <h1 className='font-medium text-2xl'>
        Let&apos;s get the right medical college for you
      </h1>
      <h3 className='font-normal text-base'>
        Enter NEET Score and choose filter options
      </h3>
      <form
        className='medical-intial-filters flex flex-col mt-2 md:w-full md:items-center gap-6 justify-start'
        onSubmit={handleSubmit(searchSubmission)}
      >
        <div className='flex flex-col gap-12 md:gap-8'>
          {/* Category and Years container */}
          <div className='flex flex-col md:flex-row gap-7 justify-center md:justify-start md:gap-10 md:flex-wrap'>
            {/* Medical cutoff category choose */}
            <div className='flex flex-col justify-center gap-1 w-full md:w-[unset]'>
              <p className='font-normal text-sm'>Counselling category:</p>
              <SegmentedControl
                ref={cutoffCategoryRef}
                withItemsBorders={false}
                color='blue'
                styles={{
                  root: {
                    width:
                      windowSize.width != -1 && windowSize.width < 768
                        ? "100%"
                        : "20rem",
                  },
                  innerLabel: (value) => {
                    return value && { color: "white" };
                  },
                }}
                value={searchCriteria?.counsellingCategory ?? "STATE"}
                onChange={(value) =>
                  setSearchCriteria((prev) => ({
                    ...prev,
                    counsellingCategory: value,
                    communityCategory:
                      value == "STATE"
                        ? COUNSELLING_CATEGORY.STATE[0]
                        : COUNSELLING_CATEGORY.MCC[0],
                  }))
                }
                data={[
                  {
                    label: "State",
                    value: "STATE",
                  },
                  {
                    label: "MCC",
                    value: "MCC",
                  },
                ]}
              />
            </div>
            {/* Category based on cutoff category */}
            <div className='flex flex-col justify-center gap-1'>
              <p className='font-normal text-sm'>Quota:</p>
              <Select
                allowDeselect={false}
                comboboxProps={{ shadow: "md" }}
                value={
                  searchCriteria?.communityCategory ??
                  COUNSELLING_CATEGORY[
                    searchCriteria?.counsellingCategory ?? "STATE"
                  ][0]
                }
                onChange={(value) => {
                  setSearchCriteria((prev) => ({
                    ...prev,
                    communityCategory: value,
                  }));
                }}
                data={
                  COUNSELLING_CATEGORY[
                    searchCriteria?.counsellingCategory ?? "STATE"
                  ]
                }
                checkIconPosition='left'
                styles={{
                  root: { width: windowSize.width < 768 ? "100%" : "12rem" },
                  input: {
                    fontFamily: inter.style.fontFamily,
                    borderColor:
                      windowSize.width < 768
                        ? tw.theme.colors["mantine-blue"]
                        : tw.theme.colors.gray[200],
                  },
                }}
              />
            </div>
            {/* State choose */}
            <div className='flex flex-col justify-center gap-1'>
              <p className='font-normal text-sm'>State:</p>
              <Select
                ref={stateInputRef}
                defaultValue='TN'
                allowDeselect={false}
                checkIconPosition='right'
                styles={{
                  root: { width: "8rem" },
                  input: {
                    fontFamily: inter.style.fontFamily,
                    borderColor:
                      windowSize.width < 768
                        ? tw.theme.colors["mantine-blue"]
                        : tw.theme.colors.gray[200],
                  },
                }}
                data={[{ label: "Tamil Nadu", value: "TN" }]} // for now only year 2023 is available. later add 2021 and 2022 too
              />
            </div>
            {/* Year choose */}
            <div className='flex flex-col justify-center gap-1'>
              <p className='font-normal text-sm'>Year:</p>
              <Select
                ref={stateInputRef}
                defaultValue='2023'
                value={searchCriteria?.year}
                onChange={(value) =>
                  setSearchCriteria((prev) => ({ ...prev, year: value }))
                }
                allowDeselect={false}
                checkIconPosition='right'
                styles={{
                  root: { width: "8rem" },
                  input: {
                    fontFamily: inter.style.fontFamily,
                    borderColor:
                      windowSize.width < 768
                        ? tw.theme.colors["mantine-blue"]
                        : tw.theme.colors.gray[200],
                  },
                }}
                data={["2023"]} // for now only year 2023 is available. later add 2021 and 2022 too
              />
            </div>
          </div>

          <hr className='md:hidden self-center border-none border-0 bg-black/10 h-[1px] w-[90%]' />

          {/* Linear Search bar */}
          <div className='grid grid-cols-2 grid-rows-2 gap-2 gap-y-7 md:flex md:gap-2 md:justify-start md:items-center md:flex-wrap'>
            <div className='flex flex-col gap-1 items-center relative'>
              <p className='font-normal text-sm w-full text-left'>
                Minimum NEET Score:
              </p>
              <input
                type='number'
                name='minimum-cutoff'
                id='minimum-cutoff'
                placeholder='Minimum Cutoff'
                className='bg-card/10 outline p-2 max-w-44 w-full md:w-[8.5rem] placeholder:text-sm md:mb-0 mb-3 rounded-md outline-1 md:focus:outline-1 focus:outline-2 outline-mantine-blue/50 md:outline-gray-200 focus:outline-mantine-blue'
                {...register("MinNEET", {
                  required: { value: true, message: "This field is required" },
                  min: {
                    value: 70,
                    message: "Minimum cutoff should be greater than 107",
                  },
                  max: {
                    value: 200,
                    message: "Minimum cutoff should be less than 720",
                  },
                })}
                defaultValue={107}
              />
              {errors["MinNEET"] && (
                <p className='text-xs text-red-500 font-light absolute -bottom-4 left-0'>
                  {errors["MinNEET"].message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-1 items-center relative'>
              <p className='font-normal text-sm w-full text-left'>
                NEET Score:
              </p>
              <input
                type='number'
                name='ending-cutoff'
                id='ending-cutoff'
                placeholder='Ending Cut-Off'
                className='bg-card/10 outline p-2 max-w-44 w-full md:w-[8.5rem] placeholder:text-sm md:mb-0 mb-3 rounded-md outline-1 md:focus:outline-1 focus:outline-2 outline-mantine-blue/50 md:outline-gray-200 focus:outline-mantine-blue/60'
                {...register("MaxNEET", {
                  required: { value: true, message: "This field is required" },
                  min: {
                    value: 107,
                    message: "Maximum cutoff should be greater than 107",
                  },
                  max: {
                    value: 720,
                    message: "Maximum cutoff should be less than 720",
                  },
                })}
              />
              {errors["MaxNEET"] && (
                <p className='text-xs text-red-500 font-light absolute -bottom-4 left-0'>
                  {errors["MaxNEET"].message}
                </p>
              )}
            </div>

            <div className='grid col-span-2 md:flex md:flex-col md:gap-1 md:items-center relative'>
              <p className='font-normal text-sm w-full text-left'>
                Course Name:
              </p>
              <Select
                allowDeselect={false}
                placeholder='Select department'
                data={[
                  { label: "MBBS", value: "MBBS" },
                  { label: "BDS", value: "BDS", disabled: true },
                ]}
                hiddenInputProps={{
                  ...register("Course", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    validate: (value) =>
                      value != "" || "Invalid value selected!",
                  }),
                }}
                onChange={(value) => {
                  setValue("Course", value);
                }}
                styles={{
                  root: {
                    width: windowSize.width < 768 ? "100%" : "20rem",
                  },
                  input: {
                    paddingTop: "0.7rem",
                    paddingBottom: "0.7rem",
                    borderRadius: "0.4rem",
                    fontFamily: inter.style.fontFamily,
                    fontWeight: inter.style.fontWeight,
                    borderColor:
                      windowSize.width < 768
                        ? tw.theme.colors["mantine-blue"]
                        : tw.theme.colors.gray[200],
                    md: {
                      borderColor: "black",
                    },
                  },
                  section: {
                    paddingTop: "0.7rem",
                    paddingBottom: "0.7rem",
                  },
                  option: {
                    fontSize: "0.8rem",
                  },
                }}
                comboboxProps={{ withArrow: true, offset: 0, shadow: "xl" }}
              />
              {errors["Course"] && (
                <p className='text-xs text-red-500 font-light absolute -bottom-4 left-0'>
                  {errors["Course"].message}
                </p>
              )}
            </div>

            <div className='grid col-span-2 md:flex md:flex-col md:gap-1 md:items-center relative'>
              <p className='font-normal text-sm w-full text-left'>Community:</p>
              <select
                name='community'
                defaultValue={"Select"}
                // value={getValues("community")}
                // onChange={({ currentTarget: { value: x }}) =>
                //   setValue("community", x)
                // }
                className='bg-card/10 outline p-2 py-2.5 text-sm pr-8 rounded-md outline-[0.8px] md:focus:outline-1 focus:outline-2 outline-mantine-blue/50 md:outline-gray-200 placeholder:text-sm focus:outline-mantine-blue/60'
                id='community'
                {...register("community", {
                  required: { value: true, message: "This field is required" },
                  validate: (value) =>
                    value !== "select" || "Invalid value selected!",
                })}
              >
                <option value='select'>Select Category</option>
                {COMMUNITY[searchCriteria?.counsellingCategory ?? "STATE"].map(
                  (cat) => (
                    <option key={Math.random()} value={cat}>
                      {cat}
                    </option>
                  )
                )}
              </select>
              {errors["community"] && (
                <p className='text-xs text-red-500 font-light absolute -bottom-4 left-0'>
                  {errors["community"].message}
                </p>
              )}
            </div>

            <div className='grid col-span-2 md:flex md:flex-col md:gap-1 md:items-center relative'>
              <p className='font-normal text-sm w-full text-white text-left'>
                &nbsp;
              </p>
              <button className='bg-mantine-blue text-center col-span-2 w-full md:w-fit md:px-6 py-1.5 text-lg rounded flex gap-2 text-white items-center justify-center md:ml-2'>
                <LuSearch />
                <p>Go</p>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Results table */}
      <div className='flex flex-col h-full w-full gap-4 items-center md:mt-2'>
        {searchCriteria?.community ? (
          <Suspense fallback={<SkeletonLoader />}>
            <div className='flex md:flex-row flex-col w-full mt-8 gap-2 justify-between items-center'>
              {/* College name or code search */}
              <input
                type='search'
                name='searchKey'
                placeholder='Search by college name, college code, etc.'
                id='search'
                className='py-2 px-3 w-full md:w-[50%] outline outline-1 placeholder:text-sm outline-gray-300 focus:outline-gray-400 md:outline-gray-200 rounded-md focus:outline-1 md:focus:outline-mantine-blue/60'
                onInput={(e) =>
                  setSearchCriteria({
                    ...searchCriteria,
                    searchKey: e.currentTarget.value,
                  })
                }
              />
              <SegmentedControl
                label={"Filter By"}
                value={searchCriteria.filterBy}
                color='blue'
                styles={{
                  root: { width: window.innerWidth < 768 ? "100%" : "unset" },
                }}
                onChange={(value) =>
                  setSearchCriteria((prev) => ({ ...prev, filterBy: value }))
                }
                data={[
                  {
                    label: "By State Rank",
                    value: "State Rank",
                  },
                  {
                    label: "By NEET Mark",
                    value: "NEET Mark",
                  },
                ]}
              />
            </div>
            <MedicalCutoffTable searchCriteria={searchCriteria} />
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
}
