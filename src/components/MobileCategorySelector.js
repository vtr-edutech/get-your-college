import { selectCategory } from "@/store/collegeCategorySlice";
import { getWindowSize } from "@/utils";
import { COLLEGE_CATEGORIES } from "@/utils/nav_data";
import { Combobox, useCombobox } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MobileCategorySelector() {
  const [windowSize, setWindowSize] = useState({ width: 1123, height: 879 });

  const dispatch = useDispatch();
  const selectedCollegeCategory = useSelector((state) => state.collegeCategory);

  const collegeCategorySelect = useCombobox({
    onDropdownClose: () => collegeCategorySelect.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      eventSource == "keyboard"
        ? collegeCategorySelect.selectActiveOption()
        : collegeCategorySelect.updateSelectedOptionIndex("active");
    },
  });

  const collegeCategoryDisplay = useMemo(
    () => COLLEGE_CATEGORIES.find((c) => c.value === selectedCollegeCategory),
    [selectedCollegeCategory]
  );

  useEffect(() => {
    setWindowSize(getWindowSize());
  }, []);

  return (
    windowSize.width < 768 && (
      <div className='md:hidden absolute z-50 top-0 left-1/2 -translate-x-[50%] w-56 bg-transparent px-5 h-0'>
        <Combobox
          store={collegeCategorySelect}
          resetSelectionOnOptionHover
          withinPortal={false}
          withArrow
          shadow='md'
          transitionProps={{
            transition: "pop",
          }}
          onOptionSubmit={(v) => {
            dispatch(selectCategory(v));
            collegeCategorySelect.updateSelectedOptionIndex("active");
            collegeCategorySelect.closeDropdown();
          }}
          styles={{
            width: "70%",
          }}
        >
          <Combobox.Target targetType='button'>
            <button
              className='w-56 flex gap-2 absolute top-0 left-1/2 -translate-x-[50%]
                        border-t-[2.8rem] border-t-gray-50
                        border-r-[0.8rem] border-r-transparent
                        border-l-[0.8rem] border-l-transparent
                        border-b-[4rem] border-b-transparent  collge-type-selector'
              onClick={() => collegeCategorySelect.toggleDropdown()}
            >
              <span className='flex gap-2 items-center absolute -top-[4vh] left-1/2 -translate-x-[50%]'>
                {collegeCategoryDisplay.icon}
                {collegeCategoryDisplay.name}
                <Combobox.Chevron />
              </span>
            </button>
          </Combobox.Target>
          <Combobox.Dropdown
            styles={{
              dropdown: {
                position: "absolute",
                top: "3rem",
                width: "60%",
              },
            }}
          >
            <Combobox.Options>
              {COLLEGE_CATEGORIES.filter(
                (cateogry) => cateogry.value !== selectedCollegeCategory
              ).map((cateogry, j) => (
                <Combobox.Option
                  disabled={cateogry.disabled}
                  className='flex items-center gap-2 text-balance'
                  key={Math.random()}
                  value={cateogry.value}
                  active={cateogry.value === selectedCollegeCategory}
                >
                  {cateogry.icon}
                  {cateogry.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </div>
    )
  );
}

export default MobileCategorySelector;
