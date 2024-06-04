import AdvertBanner from "@/components/AdvertBanner";
import ContentCard from "@/components/ContentCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import { getWindowSize } from "@/utils";
import { ALL_VALID_CATEGORIES, COLLEGE_CATEGORIES } from "@/utils/nav_data";
import { SegmentedControl } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MedicalCollegeInfoTable = lazy(() => import("@/components/tables/MedicalCollegeInfoTable"));

const Medical = () => {
  const currentSubCategoryType = useSearchParams().get("t");
  const [collegeSearchKey, setCollegeSearchKey] = useDebouncedState("", 400);

  const [windowSize, setwindowSize] = useState({ width: 1230, height: 1234 });
  const [searchCriteria, setSearchCriteria] = useState({
    searchKey: "",
    collegeType: currentSubCategoryType,
    filterBy: "State Rank",
    collegeState: "State",
    sfpu: "SF"
  });

  let subcategoryIndex = -1;
  
  const selectedCollegeType = useSelector((state) => state.collegeCategory);
  // console.log("🚀 ~ Medical ~ selectedCollegeType:", selectedCollegeType)

  if (currentSubCategoryType)
    subcategoryIndex = COLLEGE_CATEGORIES.findIndex(
      (category) =>
        (selectedCollegeType == category.value) && (category.subcategories.find(cat => cat.value == currentSubCategoryType))
    );
    // console.log("🚀 ~ Medical ~ subcategoryIndex:", subcategoryIndex)

  useEffect(() => {
    setwindowSize(getWindowSize());
  }, []);
  
  useEffect(() => {
    setSearchCriteria(prev => ({ ...prev, collegeType: currentSubCategoryType, sfpu: currentSubCategoryType == "Deemed"? "Deemed - NRI": "SF", filterBy: currentSubCategoryType == "Deemed"? "All India Rank": "State Rank" }))
  }, [currentSubCategoryType]);

  if (!currentSubCategoryType || subcategoryIndex === -1 || currentSubCategoryType != searchCriteria.collegeType)
    return (
      <ContentCard>
        <h1>Invalid Subcategory Type. Please select a valid type </h1>
      </ContentCard>
    );
  
  

  return (
    <>
      <AdvertBanner />
      <h1 className="text-2xl font-medium">
        Search for {selectedCollegeType} college in{" "}
        {
          ALL_VALID_CATEGORIES.find((c) => c.value == currentSubCategoryType)
            .name
        }
      </h1>
      <input
        type="search"
        onChange={(event) => setCollegeSearchKey(event.currentTarget.value)}
        name="college-search"
        id="search-input"
        placeholder="Search by College name, District, City, State, Pincode"
        className="rounded-md bg-white px-3 py-2 outline outline-1 outline-gray-300 placeholder:text-sm focus:outline-1 focus:outline-gray-400 md:outline-gray-200 md:focus:outline-mantine-blue"
      />
      <ContentCard>
        <div className="mb-3 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
          <SegmentedControl
            label={"College Type"}
            value={
              currentSubCategoryType == "Govt"
                ? searchCriteria.collegeState
                : searchCriteria.sfpu
            }
            color="blue"
            styles={{
              root: { width: window.innerWidth < 768 ? "100%" : "unset" },
            }}
            onChange={(value) =>
              currentSubCategoryType != "Deemed"
                ? setSearchCriteria({
                    ...searchCriteria,
                    collegeState:
                      currentSubCategoryType == "Govt"
                        ? value
                        : searchCriteria.collegeState,
                    sfpu: currentSubCategoryType == "Govt"? searchCriteria.sfpu: value,
                    filterBy: value == "AIQ" ? "Rank" : "State Rank",
                  })
                : setSearchCriteria({ ...searchCriteria, sfpu: value })
            }
            data={
              currentSubCategoryType == "Govt"
                ? [
                    {
                      label: "State Colleges",
                      value: "State",
                    },
                    {
                      label: "All India Colleges",
                      value: "AIQ",
                    },
                  ]
                : searchCriteria?.collegeType == "SF"
                  ? [
                      {
                        label: "Self-Financing",
                        value: "SF",
                      },
                      {
                        label: "Private University",
                        value: "PU",
                      },
                    ]
                  : [
                      {
                        label: "Deemed / NRI",
                        value: "Deemed - NRI",
                      },
                      {
                        label: "Deemed / Management",
                        value: "Deemed - Management",
                      },
                    ]
            }
          />
          <SegmentedControl
            label={"Filter By"}
            value={
              // searchCriteria?.counsellingCategory == "STATE"?
              searchCriteria.filterBy
              // : "All India Rank"
            }
            color="blue"
            styles={{
              root: {
                width: window.innerWidth < 768 ? "100%" : "unset",
                marginLeft: "auto",
              },
            }}
            onChange={(value) =>
              setSearchCriteria((prev) => ({ ...prev, filterBy: value }))
            }
            data={
              (searchCriteria?.collegeType == "Govt" &&
                searchCriteria?.collegeState == "State") ||
              searchCriteria?.collegeType == "SF"
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
                : [{ label: "All India Rank", value: "Rank" }]
            }
          />
        </div>
        <Suspense fallback={<SkeletonLoader />}>
          <MedicalCollegeInfoTable
            searchCriteria={{ ...searchCriteria, searchKey: collegeSearchKey }}
          />
        </Suspense>
      </ContentCard>
    </>
  );
};

export default Medical;
