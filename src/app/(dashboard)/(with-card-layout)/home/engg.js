"use client";
import Image from "next/image";
import React, {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";
import {
  Modal,
  MultiSelect,
  SegmentedControl,
  Select,
} from "@mantine/core";
import SkeletonLoader from "@/components/SkeletonLoader";
import { ALL_DISTRICT } from "@/utils/collegeDistrictData";
import { getWindowSize, inter, tw } from "@/utils";
import { useDisclosure } from "@mantine/hooks";
import CutoffCalculator from "@/components/CutoffCalculator";
import { collegeCourseGroups } from "@/utils/collegeCourseGroups";
import { useTour } from "@reactour/tour";
import { CUSTOM_BREAKPOINT } from "@/constants";

const CollegesTable = lazy(() => import("@/components/CollegesTable"));

const Home = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm();
  const yearInputRef = useRef();
  const cutoffCategoryRef = useRef();

  /* setting window height to this because it doesn make huge diff between 100% and 20rem, so phone la 100% also ok, 20rem also ok
   * but it sucks when initially window size is less than CUSTOM_BREAKPOINT, if so, there is a jerk when actual size is calculated in useffect
   */
  const [windowSize, setwindowSize] = useState({ width: 1230, height: 1234 });

  /* for modal */
  const [opened, { open, close }] = useDisclosure();

  const [searchCriteria, setSearchCriteria] = useState({
    cutoffCategory: "GC",
    filterBy: "Cutoff",
    searchKey: "",
    districtKey: "",
  });
  const [courseGroup, setCourseGroup] = useState("ALL");

  // console.log("🚀 ~ Home ~ searchCriteria:", searchCriteria);
  // console.log("🚀 ~ Home ~ courseGroup:", courseGroup);

  const courseGroupsDropdownData = useMemo(
    () =>
      courseGroup === "ALL"
        ? [{ group: "ALL DEPARTMENTS", items: ["ALL"] }].concat(
            Object.keys(collegeCourseGroups).map((group) => ({
              group: group,
              items: collegeCourseGroups[group].map((course) => ({
                label: course["Branch Name"],
                value: course["Branch Code"],
              })),
            }))
          )
        : [{ group: "ALL DEPARTMENTS", items: ["ALL"] }].concat(
            Object.keys(collegeCourseGroups)
              .filter((group) => group == courseGroup)
              .map((group) => ({
                group: group,
                items: collegeCourseGroups[group].map((course) => ({
                  label: course["Branch Name"],
                  value: course["Branch Code"],
                })),
              }))
          ),
    [courseGroup]
  );

  const { currentStep, isOpen, setCurrentStep, setIsOpen } = useTour();
  // current step ah depend ah paathu, if currstep not 1 or 0, then open if localstorageHomeTour is false
  useEffect(() => {
    const hasHomeFilterTourPlayed = localStorage.getItem("hasHomeFilterPlayed");
    if (!isOpen && (!hasHomeFilterTourPlayed || hasHomeFilterTourPlayed != "true") /* && ![0, 1, 4, 5, 6].includes(currentStep)*/) {
      setIsOpen(true);
      setCurrentStep(2);
    }
  }, [currentStep, isOpen]);

  useEffect(() => {
    setwindowSize(getWindowSize());
  }, []);

  const searchSubmission = async (data) => {
    // console.log("submit data", data);
    if (Object.keys(data).length !== 0) {
      if (parseInt(data.MinCutoff) > parseInt(data.MaxCutoff)) {
        setError(
          "MinCutoff",
          {
            type: "validate",
            message: "Starting cutoff should be less than Ending cutoff",
          },
          { shouldFocus: true }
        );
        // setSearchCriteria(null);
        return;
      }
      const chosenYear = yearInputRef.current.value;
      setSearchCriteria({ ...searchCriteria, ...data, year: chosenYear });
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        transitionProps={{ transition: "pop" }}
        onClose={close}
        centered
        title='Cut-off Calculator'
        styles={{
          content: {
            overflow: "hidden",
          },
        }}
      >
        <CutoffCalculator />
      </Modal>
      <h1 className='font-medium text-2xl'>
        Let&apos;s get the right engineering college for you
      </h1>
      <h3 className='font-normal text-base'>
        Enter 12th Cut-Off marks and choose filter options
      </h3>
      <form
        className='flex flex-col mt-2 md:w-full md:items-center gap-6 justify-start'
        onSubmit={handleSubmit(searchSubmission)}
      >
        <div className='flex flex-col gap-12 md:gap-8 initial-filters'>
          {/* Category and Years container */}
          <div className='flex flex-col md:flex-row gap-7 justify-center md:justify-start md:gap-16 md:flex-wrap'>
            {/* Cutoff Category choose */}
            <div className='flex flex-col justify-center gap-1 w-full md:w-[unset]'>
              <p className='font-normal text-sm'>Cutoff category:</p>
              <SegmentedControl
                ref={cutoffCategoryRef}
                withItemsBorders={false}
                color='blue'
                styles={{
                  root: {
                    width:
                      windowSize.width != -1 &&
                      windowSize.width < CUSTOM_BREAKPOINT
                        ? "100%"
                        : "20rem",
                  },
                  innerLabel: (value) => {
                    return value && { color: "white" };
                  },
                }}
                value={searchCriteria?.cutoffCategory || "GC"}
                onChange={(value) =>
                  setSearchCriteria((prev) => ({
                    ...prev,
                    cutoffCategory: value,
                  }))
                }
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
                    disabled: true,
                  },
                ]}
              />
            </div>
            {/* Groups choose */}
            <div className='flex flex-col justify-center gap-1'>
              <p className='font-normal text-sm'>Choose Domain:</p>
              <Select
                comboboxProps={{ shadow: "md" }}
                defaultValue='ALL'
                allowDeselect={false}
                checkIconPosition='left'
                title={courseGroup}
                styles={{
                  root: {
                    width:
                      windowSize.width < CUSTOM_BREAKPOINT ? "100%" : "12rem",
                  },
                  input: {
                    fontFamily: inter.style.fontFamily,
                    borderColor:
                      windowSize.width < CUSTOM_BREAKPOINT
                        ? tw.theme.colors["mantine-blue"]
                        : tw.theme.colors.gray[200],
                  },
                }}
                onChange={(value) => setCourseGroup(value)}
                data={[{ label: "All departments", value: "ALL" }, ...Object.keys(collegeCourseGroups)]} // for now only year 2023 is available. later add 2021 and 2022 too
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
                styles={{
                  root: { width: "8rem" },
                  input: {
                    fontFamily: inter.style.fontFamily,
                    borderColor:
                      windowSize.width < CUSTOM_BREAKPOINT
                        ? tw.theme.colors["mantine-blue"]
                        : tw.theme.colors.gray[200],
                  },
                }}
                onChange={(value) =>
                  setSearchCriteria((prev) => ({ ...prev, year: value }))
                }
                data={["2023"]} // for now only year 2023 is available. later add 2021 and 2022 too
              />
            </div>
          </div>

          <hr className='md:hidden self-center border-none border-0 bg-black/10 h-[1px] w-[90%]' />

          {/* Linear Search bar */}
          <div className='grid grid-cols-2 grid-rows-2 gap-4 gap-y-7 md:flex md:gap-4 md:justify-start md:items-center md:flex-wrap'>
            {/* Min cutoff */}
            <div className='flex flex-col gap-1 md:items-center relative'>
              <p className='font-normal text-sm w-full text-left'>
                Minimum Cut-off:
              </p>
              <input
                type='number'
                name='starting-cutoff'
                id='starting-cutoff'
                placeholder='Starting Cut-Off'
                className='bg-card/10 outline p-2 max-w-44 w-full md:w-[8.5rem] placeholder:text-sm md:mb-0 mb-3 rounded-md outline-1 md:focus:outline-1 focus:outline-2 outline-mantine-blue/50 md:outline-gray-200 focus:outline-mantine-blue'
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
                defaultValue={70}
              />
              {errors["MinCutoff"] && (
                <p className='text-xs text-red-500 font-light absolute -top-7 left-0'>
                  {errors["MinCutoff"].message}
                </p>
              )}
              <p
                className='underline text-xs absolute cursor-pointer  top-[90%] md:top-[110%] left-1'
                onClick={open}
              >
                Calculate my Cut-off?
              </p>
            </div>
            {/* Max cutoff */}
            <div className='flex flex-col gap-1 md:items-center relative'>
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
            {/* Dept */}
            <div className='grid col-span-2 md:flex md:flex-col md:gap-1 md:items-center relative'>
              {/* For now we are using multi select, maybe revert or use combo later */}
              {/* Deleted previous versions of multiselec.. venuma na, old repo landhu edthuko */}
              <p className='font-normal text-sm w-full text-left'>
                Department:
              </p>
              <MultiSelect
                searchable
                placeholder='Select department'
                data={courseGroupsDropdownData}
                hiddenInputProps={{
                  ...register("Dept", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    validate: (value) =>
                      value != "" || "Invalid value selected!",
                  }),
                }}
                onChange={(values) => {
                  if (values.includes("ALL") && values.length > 1) {
                    setValue("Dept", "ALL");
                  } else {
                    setValue("Dept",values);
                  }
                }}
                styles={{
                  root: {
                    width:
                      windowSize.width < CUSTOM_BREAKPOINT ? "100%" : "20rem",
                  },
                  input: {
                    paddingTop: "0.55rem",
                    paddingBottom: "0.55rem",
                    borderRadius: "0.4rem",
                    fontFamily: inter.style.fontFamily,
                    fontWeight: inter.style.fontWeight,
                    borderColor:
                      windowSize.width < CUSTOM_BREAKPOINT
                        ? tw.theme.colors["mantine-blue"]
                        : tw.theme.colors.gray[200],
                    md: {
                      borderColor: "black",
                    },
                  },
                  pill: {
                    maxWidth: "5rem",
                    fontSize: "0.7rem",
                  },
                  option: {
                    fontSize: "0.8rem",
                  },
                  groupLabel: {
                    fontSize: "0.7rem",
                    padding: 3,
                  },
                  pillsList: {
                    maxHeight: "3rem",
                    overflowY: "scroll",
                  },
                }}
                comboboxProps={{ withArrow: true, offset: 0, shadow: "xl" }}
              />
              {errors["Dept"] && (
                <p className='text-xs text-red-500 font-light absolute -top-4 left-0'>
                  {errors["Dept"].message}
                </p>
              )}
            </div>
            {/* Category */}
            <div className='grid col-span-2 md:flex md:flex-col md:gap-1 md:items-center relative'>
              <p className='font-normal text-sm w-full text-left'>Community:</p>
              <select
                name='category'
                defaultValue={"Select"}
                className='bg-card/10 outline p-2 py-2.5 text-sm pr-8 rounded-md outline-[0.8px] md:focus:outline-1 focus:outline-2 outline-mantine-blue/50 md:outline-gray-200 placeholder:text-sm focus:outline-mantine-blue/60'
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
            {/* Submit Button */}
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

      {/* div where table is shown */}
      <div className='flex flex-col h-full w-full gap-4 items-center md:mt-2'>
        {searchCriteria?.MaxCutoff ? (
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
              {/* Combobox'd select for districts */}
              <MultiSelect
                searchable
                placeholder='Filter by District'
                data={ALL_DISTRICT}
                onChange={(value) => {
                  if (value.includes("ALL")) {
                    setSearchCriteria((prev) => ({ ...prev, DistrictKey: "ALL" }));
                  } else {
                    setSearchCriteria((prev) => ({ ...prev, DistrictKey: value }));
                  }
                }}
                comboboxProps={{
                  withArrow: true,
                  shadow: "xl",
                  offset: 0,
                }}
                styles={{
                  label: {
                    fontWeight: 400,
                  },
                  root: {
                    width:
                      windowSize.width < CUSTOM_BREAKPOINT ? "100%" : "20rem",
                  },
                  input: {
                    paddingTop: "0.44rem",
                    paddingBottom: "0.44rem",
                    borderRadius: "0.2rem",
                    fontFamily: inter.style.fontFamily,
                    fontWeight: inter.style.fontWeight,
                    borderColor:
                      windowSize.width < CUSTOM_BREAKPOINT
                        ? tw.theme.colors["mantine-blue"]
                        : tw.theme.colors.gray[200],
                    md: {
                      borderColor: "black",
                    },
                  },
                  pill: {
                    maxWidth: "5rem",
                    fontSize: "0.7rem",
                  },
                  option: {
                    fontSize: "0.8rem",
                  },
                  groupLabel: {
                    fontSize: "0.7rem",
                    padding: 3,
                  },
                  pillsList: {
                    maxHeight: "3rem",
                    overflowY: "scroll",
                  },
                }}
              />
              <SegmentedControl
                label={"Filter By"}
                value={searchCriteria.filterBy}
                color='blue'
                styles={{
                  root: {
                    width:
                      window.innerWidth < CUSTOM_BREAKPOINT ? "100%" : "unset",
                  },
                }}
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
