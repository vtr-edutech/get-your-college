"use client";

import SkeletonLoader from "@/components/SkeletonLoader";
import { getWindowSize, inter, tw } from "@/utils";
import { useUserInfo } from "@/utils/hooks";
// import { DevTool } from "@hookform/devtools";
import { SegmentedControl, Select } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { sendGAEvent } from "@next/third-parties/google";
import { useTour } from "@reactour/tour";
import Image from "next/image";
import { Suspense, lazy, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";

const MAX_RANK_MEDICAL = 1154767;

const COUNSELLING_CATEGORY = {
  STATE: [
    { label: "TN-GQ 92.5", value: "GQ 92.5" },
    { label: "TN-GQ 7.5", value: "GQ 7.5", disabled: true },
    { label: "TN-MQ General", value: "MQ General" },
    { label: "TN-MQ Telugu Minority", value: "MQ Telugu" },
    { label: "TN-MQ Christian Minority", value: "MQ Christian" },
    { label: "TN-MQ Malayalam", value: "MQ Malayalam" },
    { label: "TN-MQ NRI", value: "MQ NRI" },
    { label: "TN-MQ NRI Lapsed", value: "MQ NRI Lapsed" },
  ],
  MCC: [
    { label: "AIQ", value: "AIQ" },
    { label: "Deemed / NRI", value: "Deemed - NRI" },
    { label: "Deemed / Management", value: "Deemed - Management" },
  ],
};

const COMMUNITY = {
  STATE: ["OC", "BC", "BCM", "MBC & DNC", "SC", "SCA", "ST"],
  MCC: ["OC", "OBC", "SC", "ST", "EWS"],
};

const MedicalCutoffTable = lazy(
  () => import("@/components/tables/MedicalCollegeCutoffTable"),
);

export default function Med() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
    resetField,
  } = useForm({
    defaultValues: {
      counsellingCategory: "STATE",
      quota: COUNSELLING_CATEGORY["STATE"][0].value,
      state: "TN",
      year: "2023",
      community: "select",
    },
  });

  const [windowSize, setwindowSize] = useState({ width: 1230, height: 1234 });

  const { setIsOpen, setCurrentStep, isOpen } = useTour();
  const [hasMedicalTourPlayed, setHasMedicalTourPlayed] = useLocalStorage({
    key: "hasMedicalPlayed",
    defaultValue: false,
  });

  const [unSubmitSearch, setUnSubmitSearch] = useState({
    counsellingCategory: "STATE",
    quota: COUNSELLING_CATEGORY["STATE"][0].value,
  });

  const [searchCriteria, setSearchCriteria] = useState({
    searchKey: "",
    districtKey: "",
    filterBy: "NEET Mark",
    medicalRound: "Round-1",
  });

  const { userInfo } = useUserInfo();

  useEffect(() => {
    const hasMedicalTourPlayed = localStorage.getItem("hasMedicalPlayed");
    if ((!hasMedicalTourPlayed || hasMedicalTourPlayed != "true") && !isOpen) {
      setCurrentStep(3);
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    setwindowSize(getWindowSize());
  }, []);

  const searchSubmission = async (data) => {
    console.log("submit data", data);
    if (Object.keys(data).length !== 0) {
      if (unSubmitSearch.counsellingCategory == "STATE") {
        if (parseInt(data.MinNEET) > parseInt(data.MaxNEET)) {
          setError(
            "MinNEET",
            {
              type: "validate",
              message:
                "Minimum NEET score should be less than Maximum NEET score",
            },
            { shouldFocus: true },
          );
          return;
        }
      } else {
        data.MaxNEET = MAX_RANK_MEDICAL;
      }
      if (data.community == "select") {
        setError(
          "community",
          {
            type: "validate",
            message: "Invalid Community!",
          },
          { shouldFocus: true },
        );

        return;
      }
      sendGAEvent("event", "med_cutoff_submit", {
        user: userInfo.firstName + "-" + userInfo.mobile,
        ...searchCriteria,
        ...data,
        ...unSubmitSearch,
      });
      setSearchCriteria({ ...searchCriteria, ...data, ...unSubmitSearch });
      // console.log("🚀 ~ searchSubmission ~ searchCriteria:", searchCriteria)
    }
  };

  return (
    <>
      <h1 className="text-2xl font-medium">
        Let&apos;s get the right medical college for you
      </h1>
      <h3 className="text-base font-normal">
        Enter NEET Score and choose filter options
      </h3>
      <form
        className="medical-intial-filters mt-2 flex flex-col justify-start gap-6 md:w-full md:items-center"
        onSubmit={handleSubmit(searchSubmission)}
      >
        <div className="flex flex-col gap-12 md:gap-8">
          {/* Category and Years container */}
          <div className="flex flex-col justify-center gap-7 md:flex-row md:flex-wrap md:justify-start md:gap-10">
            {/* Medical counselling category choose */}
            <div className="relative flex w-full flex-col justify-center gap-1 md:w-[unset]">
              <p className="text-sm font-normal">Counselling category:</p>
              <SegmentedControl
                value={unSubmitSearch.counsellingCategory}
                withItemsBorders={false}
                color="blue"
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
                onChange={(value) => {
                  setValue("counsellingCategory", value);
                  setValue("MinNEET", value == "STATE" ? 107 : 1);
                  resetField("MaxNEET");
                  if (value == "MCC") {
                    setValue("MaxNEET", MAX_RANK_MEDICAL);
                  }
                  setUnSubmitSearch((prev) => ({
                    ...prev,
                    counsellingCategory: value,
                    quota: COUNSELLING_CATEGORY[value][0].value,
                  }));
                }}
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
              >
                <input
                  type="hidden"
                  {...register("counsellingCategory", {
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                    validate: (value) =>
                      ["STATE", "MCC"].includes(value) ||
                      "Invalid selection made!",
                  })}
                />
                {errors["counsellingCategory"] && (
                  <p className="absolute -bottom-4 left-0 text-xs font-light text-red-500">
                    {errors["counsellingCategory"].message}
                  </p>
                )}
              </SegmentedControl>
            </div>
            {/* Quota based on cutoff category */}
            <div className="relative flex flex-col justify-center gap-1">
              <p className="text-sm font-normal">Quota:</p>
              <Select
                allowDeselect={false}
                comboboxProps={{ shadow: "md" }}
                value={unSubmitSearch.quota}
                onChange={(value) => {
                  setValue("quota", value);
                  setUnSubmitSearch((prev) => ({ ...prev, quota: value }));
                }}
                data={
                  COUNSELLING_CATEGORY[unSubmitSearch["counsellingCategory"]]
                }
                hiddenInputProps={{
                  ...register("quota", {
                    required: {
                      message: "Quota required!",
                      value: true,
                    },
                  }),
                }}
                scrollAreaProps={{
                  type: "always",
                }}
                checkIconPosition="left"
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
              {errors["quota"] && (
                <p className="absolute -bottom-4 left-0 text-xs font-light text-red-500">
                  {errors["quota"].message}
                </p>
              )}
            </div>
            {/* State choose */}
            <div className="flex flex-col justify-center gap-1">
              <p className="text-sm font-normal">State:</p>
              <Select
                defaultValue="TN"
                allowDeselect={false}
                disabled={unSubmitSearch.counsellingCategory == "MCC"}
                checkIconPosition="right"
                comboboxProps={{ shadow: "xl" }}
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
                value={
                  unSubmitSearch.counsellingCategory == "MCC" ? "AI" : "TN"
                }
                data={[
                  { label: "Tamil Nadu", value: "TN" },
                  {
                    label: "All India",
                    value: "AI",
                    disabled: unSubmitSearch.counsellingCategory == "STATE",
                  },
                ]} // for now only TN available
              />
            </div>
            {/* Year choose */}
            <div className="relative flex flex-col justify-center gap-1">
              <p className="text-sm font-normal">Year:</p>
              <Select
                defaultValue="2023"
                comboboxProps={{ shadow: "xl" }}
                // value={searchCriteria?.year}
                onChange={(value) =>
                  // setSearchCriteria((prev) => ({ ...prev, year: value }))
                  setValue("year", value)
                }
                allowDeselect={false}
                checkIconPosition="right"
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
                hiddenInputProps={{
                  ...register("year", {
                    required: true,
                    validate: (value) =>
                      parseInt(value) <= new Date().getFullYear() ||
                      "Invalid year!",
                  }),
                }}
                data={["2023"]} // for now only year 2023 is available. later add 2021 and 2022 too
              />
              {errors["year"] && (
                <p className="absolute -bottom-4 left-0 text-xs font-light text-red-500">
                  {errors["year"].message}
                </p>
              )}
            </div>
          </div>

          <hr className="h-[1px] w-[90%] self-center border-0 border-none bg-black/10 md:hidden" />

          {/* Linear Search bar */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2 gap-y-7 md:flex md:flex-wrap md:items-center md:justify-start md:gap-2">
            {/* Min NEET */}
            <div className="relative flex flex-col items-center gap-1">
              <p className="w-full text-left text-sm font-normal">
                {unSubmitSearch.counsellingCategory == "STATE"
                  ? "Min (NEET Score)"
                  : "Your Rank"}
              </p>
              <input
                type="number"
                name="minimum-cutoff"
                id="minimum-cutoff"
                placeholder="Minimum Cutoff"
                className="mb-3 w-full max-w-44 rounded-md bg-card/10 p-2 outline outline-1 outline-mantine-blue/50 placeholder:text-sm focus:outline-2 focus:outline-mantine-blue md:mb-0 md:w-[8.5rem] md:outline-gray-200 md:focus:outline-1"
                {...register("MinNEET", {
                  required: { value: true, message: "This field is required" },
                  min: {
                    value:
                      unSubmitSearch.counsellingCategory == "STATE" ? 107 : 1,
                    message: `Minimum ${
                      unSubmitSearch.counsellingCategory == "STATE"
                        ? "cutoff"
                        : "rank"
                    } should be greater than ${
                      unSubmitSearch.counsellingCategory == "STATE" ? 107 : 1
                    }`,
                  },
                  max: {
                    value:
                      unSubmitSearch.counsellingCategory == "STATE"
                        ? 720
                        : MAX_RANK_MEDICAL,
                    message: `Maximum ${
                      unSubmitSearch.counsellingCategory == "STATE"
                        ? "cutoff"
                        : "rank"
                    } should be less than ${
                      unSubmitSearch.counsellingCategory == "STATE"
                        ? 720
                        : MAX_RANK_MEDICAL
                    }`,
                  },
                })}
                defaultValue={
                  unSubmitSearch.counsellingCategory == "STATE" ? 107 : 1
                }
              />
              {errors["MinNEET"] && (
                <p className="absolute -bottom-4 left-0 translate-y-[70%] text-xs font-light text-red-500">
                  {errors["MinNEET"].message}
                </p>
              )}
            </div>

            {/* Max NEET */}
            <div className="relative flex flex-col items-center gap-1">
              <p className="w-full text-left text-sm font-normal">
                Max (
                {unSubmitSearch.counsellingCategory == "STATE"
                  ? "NEET Score"
                  : "Rank"}
                ):
              </p>
              <input
                type="number"
                name="ending-cutoff"
                id="ending-cutoff"
                disabled={unSubmitSearch.counsellingCategory == "MCC"}
                placeholder="Ending Cut-Off"
                className="mb-3 w-full max-w-44 rounded-md bg-card/10 p-2 outline outline-1 outline-mantine-blue/50 placeholder:text-sm focus:outline-2 focus:outline-mantine-blue/60 md:mb-0 md:w-[8.5rem] md:outline-gray-200 md:focus:outline-1"
                {...register("MaxNEET", {
                  required: { value: true, message: "This field is required" },
                  min: {
                    value:
                      unSubmitSearch.counsellingCategory == "STATE" ? 107 : 1,
                    message: `Minimum ${
                      unSubmitSearch.counsellingCategory == "STATE"
                        ? "cutoff"
                        : "rank"
                    } should be greater than ${
                      unSubmitSearch.counsellingCategory == "STATE" ? 107 : 1
                    }`,
                  },
                  max: {
                    value:
                      unSubmitSearch.counsellingCategory == "STATE"
                        ? 720
                        : MAX_RANK_MEDICAL,
                    message: `Maximum ${
                      unSubmitSearch.counsellingCategory == "STATE"
                        ? "cutoff"
                        : "rank"
                    } should be less than ${
                      unSubmitSearch.counsellingCategory == "STATE"
                        ? 720
                        : MAX_RANK_MEDICAL
                    }`,
                  },
                  disabled: unSubmitSearch.counsellingCategory == "MCC",
                })}
              />
              {errors["MaxNEET"] && (
                <p className="absolute -bottom-4 left-0 translate-y-[70%] text-xs font-light text-red-500">
                  {errors["MaxNEET"].message}
                </p>
              )}
            </div>

            {/* Course name */}
            <div className="relative col-span-2 grid md:flex md:flex-col md:items-center md:gap-1">
              <p className="w-full text-left text-sm font-normal">
                Course Name:
              </p>
              <Select
                allowDeselect={false}
                placeholder="Select department"
                data={[
                  { label: "MBBS", value: "MBBS" },
                  { label: "BDS", value: "BDS" },
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
                    paddingTop: "0.10rem",
                    paddingBottom: "0.10rem",
                  },
                  option: {
                    fontSize: "0.8rem",
                  },
                }}
                comboboxProps={{ withArrow: true, offset: 0, shadow: "xl" }}
              />
              {errors["Course"] && (
                <p className="absolute -bottom-4 left-0 text-xs font-light text-red-500">
                  {errors["Course"].message}
                </p>
              )}
            </div>

            {/* Community */}
            <div className="relative col-span-2 grid md:flex md:flex-col md:items-center md:gap-1">
              <p className="w-full text-left text-sm font-normal">Community:</p>
              <select
                name="community"
                disabled={["Deemed", "MQ"].includes(
                  unSubmitSearch.quota.split(" ")[0],
                )}
                onChange={(e) => {
                  setUnSubmitSearch({
                    ...unSubmitSearch,
                    community: e.currentTarget.value,
                  });
                  // setValue("community", e.currentTarget.value)
                }}
                key={"huh"}
                value={unSubmitSearch.community}
                className="rounded-md bg-card/10 p-2 py-2.5 pr-8 text-sm outline outline-[0.8px] outline-mantine-blue/50 placeholder:text-sm focus:outline-2 focus:outline-mantine-blue/60 md:outline-gray-200 md:focus:outline-1"
                id="community"
                {...register("community", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  disabled: ["Deemed", "MQ"].includes(
                    unSubmitSearch.quota.split(" ")[0],
                  ),
                })}
              >
                <option value="select">Select Category</option>
                {COMMUNITY[unSubmitSearch.counsellingCategory].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors["community"] && (
                <p className="absolute -bottom-4 left-0 text-xs font-light text-red-500">
                  {errors["community"].message}
                </p>
              )}
            </div>

            {/* Submit */}
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

      {/* devtools */}
      {/* <DevTool control={control} /> */}

      {/* Results table */}
      <div className="flex h-full w-full flex-col items-center gap-4 md:mt-2">
        {searchCriteria?.Course ? (
          <Suspense fallback={<SkeletonLoader />}>
            <div className="mt-8 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
              {/* College name or code search */}
              <input
                type="search"
                name="searchKey"
                placeholder={`Search by ${
                  unSubmitSearch.counsellingCategory == "STATE"
                    ? "college name, college code, etc."
                    : "college name, district, city, pincode"
                }`}
                id="search"
                className="w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300 placeholder:text-sm focus:outline-1 focus:outline-gray-400 md:w-[50%] md:outline-gray-200 md:focus:outline-mantine-blue/60"
                onInput={(e) =>
                  setSearchCriteria({
                    ...searchCriteria,
                    searchKey: e.currentTarget.value,
                  })
                }
              />
              <SegmentedControl
                label={"Filter By"}
                value={
                  searchCriteria?.counsellingCategory == "STATE"
                    ? searchCriteria.filterBy
                    : "All India Rank"
                }
                color="blue"
                styles={{
                  root: { width: window.innerWidth < 768 ? "100%" : "unset" },
                }}
                onChange={(value) =>
                  setSearchCriteria((prev) => ({ ...prev, filterBy: value }))
                }
                data={
                  searchCriteria?.counsellingCategory == "STATE"
                    ? [
                        {
                          label: "By State Rank",
                          value: "State Rank",
                        },
                        {
                          label: "By NEET Mark",
                          value: "NEET Mark",
                        },
                      ]
                    : ["All India Rank"]
                }
              />
            </div>

            {/* Medical Rounds */}
            <div className="mb-6 w-full overflow-x-auto">
              <SegmentedControl
                label={"Medical Round"}
                value={searchCriteria.medicalRound}
                color="blue"
                onChange={(value) =>
                  setSearchCriteria((prev) => ({
                    ...prev,
                    medicalRound: value,
                  }))
                }
                data={[
                  {
                    label: "Round 1",
                    value: "Round-1",
                  },
                  {
                    label: "Round 2",
                    value: "Round-2",
                  },
                  {
                    label: "Round 3",
                    value: "Round-3",
                  },
                  {
                    label: "Round 4",
                    value: "Round-4",
                  },
                ]}
              />
            </div>
            <MedicalCutoffTable searchCriteria={searchCriteria} />
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
}
