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
import { Modal, MultiSelect, SegmentedControl, Select } from "@mantine/core";
import SkeletonLoader from "@/components/SkeletonLoader";
import { ALL_DISTRICT } from "@/utils/collegeDistrictData";
import { getWindowSize, inter, tw } from "@/utils";
import { useDisclosure } from "@mantine/hooks";
import CutoffCalculator from "@/components/CutoffCalculator";
import { collegeCourseGroups } from "@/utils/collegeCourseGroups";
import { useTour } from "@reactour/tour";
import { CUSTOM_BREAKPOINT } from "@/constants";
import AdvertBanner from "@/components/AdvertBanner";
import { sendGAEvent } from "@next/third-parties/google";
import { useUserInfo } from "@/utils/hooks";

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

  const { loading, userInfo } = useUserInfo();

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
            })),
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
              })),
          ),
    [courseGroup],
  );

  const { currentStep, isOpen, setCurrentStep, setIsOpen } = useTour();
  // current step ah depend ah paathu, if currstep not 1 or 0, then open if localstorageHomeTour is false
  useEffect(() => {
    const hasHomeFilterTourPlayed = localStorage.getItem("hasHomeFilterPlayed");
    if (
      !isOpen &&
      (!hasHomeFilterTourPlayed ||
        hasHomeFilterTourPlayed !=
          "true") /* && ![0, 1, 4, 5, 6].includes(currentStep)*/
    ) {
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
          { shouldFocus: true },
        );
        // setSearchCriteria(null);
        return;
      }
      const chosenYear = yearInputRef.current.value;
      sendGAEvent("event", "engg_cutoff_submit", {
        user: userInfo.firstName + "-" + userInfo.mobile,
        ...searchCriteria,
        ...data,
        year: chosenYear,
      });
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
        title="Cut-off Calculator"
        styles={{
          content: {
            overflow: "hidden",
          },
        }}
      >
        <CutoffCalculator />
      </Modal>
      <AdvertBanner />
      <h1 className="text-2xl font-medium">
        Let&apos;s get the right engineering college for you
      </h1>
      <h3 className="text-base font-normal">
        Enter 12th Cut-Off marks and choose filter options
      </h3>
      <form
        className="mt-2 flex flex-col justify-start gap-6 md:w-full md:items-center"
        onSubmit={handleSubmit(searchSubmission)}
      >
        <div className="initial-filters flex flex-col gap-12 md:gap-8">
          {/* Category and Years container */}
          <div className="flex flex-col justify-center gap-7 md:flex-row md:flex-wrap md:justify-start md:gap-16">
            {/* Cutoff Category choose */}
            <div className="flex w-full flex-col justify-center gap-1 md:w-[unset]">
              <p className="text-sm font-normal">Cutoff category:</p>
              <SegmentedControl
                ref={cutoffCategoryRef}
                withItemsBorders={false}
                color="blue"
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
            <div className="flex flex-col justify-center gap-1">
              <p className="text-sm font-normal">Choose Domain:</p>
              <Select
                comboboxProps={{ shadow: "md" }}
                defaultValue="ALL"
                allowDeselect={false}
                checkIconPosition="left"
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
                data={[
                  { label: "All departments", value: "ALL" },
                  ...Object.keys(collegeCourseGroups),
                ]} // for now only year 2023 is available. later add 2021 and 2022 too
              />
            </div>
            {/* Year choose */}
            <div className="flex flex-col justify-center gap-1">
              <p className="text-sm font-normal">Search year:</p>
              <Select
                ref={yearInputRef}
                defaultValue="2023"
                allowDeselect={false}
                checkIconPosition="right"
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

          <hr className="h-[1px] w-[90%] self-center border-0 border-none bg-black/10 md:hidden" />

          {/* Linear Search bar */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 gap-y-7 md:flex md:flex-wrap md:items-center md:justify-start md:gap-4">
            {/* Min cutoff */}
            <div className="relative flex flex-col gap-1 md:items-center">
              <p className="w-full text-left text-sm font-normal">
                Minimum Cut-off:
              </p>
              <input
                type="number"
                name="starting-cutoff"
                id="starting-cutoff"
                placeholder="Starting Cut-Off"
                className="mb-3 w-full max-w-44 rounded-md bg-card/10 p-2 outline outline-1 outline-mantine-blue/50 placeholder:text-sm focus:outline-2 focus:outline-mantine-blue md:mb-0 md:w-[8.5rem] md:outline-gray-200 md:focus:outline-1"
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
                <p className="absolute -top-7 left-0 text-xs font-light text-red-500">
                  {errors["MinCutoff"].message}
                </p>
              )}
              <p
                className="absolute left-1 top-[90%] cursor-pointer text-xs underline md:top-[110%]"
                onClick={open}
              >
                Calculate my Cut-off?
              </p>
            </div>
            {/* Max cutoff */}
            <div className="relative flex flex-col gap-1 md:items-center">
              <p className="w-full text-left text-sm font-normal">
                Maximum Cut-off:
              </p>
              <input
                type="number"
                name="ending-cutoff"
                id="ending-cutoff"
                placeholder="Ending Cut-Off"
                className="mb-3 w-full max-w-44 rounded-md bg-card/10 p-2 outline outline-1 outline-mantine-blue/50 placeholder:text-sm focus:outline-2 focus:outline-mantine-blue/60 md:mb-0 md:w-[8.5rem] md:outline-gray-200 md:focus:outline-1"
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
                <p className="absolute -top-4 left-0 text-xs font-light text-red-500">
                  {errors["MaxCutoff"].message}
                </p>
              )}
            </div>
            {/* Dept */}
            <div className="relative col-span-2 grid md:flex md:flex-col md:items-center md:gap-1">
              {/* For now we are using multi select, maybe revert or use combo later */}
              {/* Deleted previous versions of multiselec.. venuma na, old repo landhu edthuko */}
              <p className="w-full text-left text-sm font-normal">
                Department:
              </p>
              <MultiSelect
                searchable
                placeholder="Select department"
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
                    setValue("Dept", values);
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
                <p className="absolute -top-4 left-0 text-xs font-light text-red-500">
                  {errors["Dept"].message}
                </p>
              )}
            </div>
            {/* Category */}
            <div className="relative col-span-2 grid md:flex md:flex-col md:items-center md:gap-1">
              <p className="w-full text-left text-sm font-normal">Community:</p>
              <select
                name="category"
                defaultValue={"Select"}
                className="rounded-md bg-card/10 p-2 py-2.5 pr-8 text-sm outline outline-[0.8px] outline-mantine-blue/50 placeholder:text-sm focus:outline-2 focus:outline-mantine-blue/60 md:outline-gray-200 md:focus:outline-1"
                id="category"
                {...register("Category", {
                  required: { value: true, message: "This field is required" },
                  validate: (value) =>
                    (value !== "select" &&
                      ["OC", "BC", "BCM", "MBC", "SC", "ST", "SCA"].includes(
                        value,
                      )) ||
                    "Invalid value selected!",
                })}
              >
                <option value="select">Select Category</option>
                <option value="OC">OC</option>
                <option value="BC">BC</option>
                <option value="BCM">BCM</option>
                <option value="MBC">MBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="SCA">SCA</option>
              </select>
              {errors["Category"] && (
                <p className="absolute -top-4 left-0 text-xs font-light text-red-500">
                  {errors["Category"].message}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <div className="relative col-span-2 grid md:flex md:flex-col md:items-center md:gap-1">
              <p className="w-full text-left text-sm font-normal text-white">
                &nbsp;
              </p>
              <button className="col-span-2 flex w-full items-center justify-center gap-2 rounded bg-mantine-blue py-1.5 text-center text-lg text-white md:ml-2 md:w-fit md:px-6">
                <LuSearch />
                <p>Go</p>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* div where table is shown */}
      <div className="flex h-full w-full flex-col items-center gap-4 md:mt-2">
        {searchCriteria?.MaxCutoff ? (
          <Suspense fallback={<SkeletonLoader />}>
            <div className="mt-8 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
              {/* College name or code search */}
              <input
                type="search"
                name="searchKey"
                placeholder="Search by college name, college code, etc."
                id="search"
                className="w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300 placeholder:text-sm focus:outline-1 focus:outline-gray-400 md:w-[50%] md:outline-gray-200 md:focus:outline-mantine-blue/60"
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
                placeholder="Filter by District"
                data={ALL_DISTRICT}
                onChange={(value) => {
                  if (value.includes("ALL")) {
                    setSearchCriteria((prev) => ({
                      ...prev,
                      DistrictKey: "ALL",
                    }));
                  } else {
                    setSearchCriteria((prev) => ({
                      ...prev,
                      DistrictKey: value,
                    }));
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
                color="blue"
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
            <p className="mt-4 text-sm font-light text-gray-500">
              Begin search by entering details and Go
            </p>
            <Image
              src={"/home-illustration.png"}
              width={220}
              height={0}
              className="outline"
              alt="Illustration Search"
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
