import  ContentCard  from "@/components/ContentCard";
import { getWindowSize } from "@/utils";
import { ALL_VALID_CATEGORIES } from "@/utils/nav_data";
import { useDebouncedState } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Medical = () => {
    const currentSubCategoryType = useSearchParams().get("t");
    const [collegeSearchKey, setCollegeSearchKey] = useDebouncedState("", 400);

    const [windowSize, setwindowSize] = useState({ width: 1230, height: 1234 });
    
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
            Data yet to be loaded
        </ContentCard>
      </>
    );
}

export default Medical;