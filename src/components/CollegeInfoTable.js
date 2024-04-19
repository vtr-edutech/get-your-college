import { usePagination } from "@mantine/hooks";
import colleges from "../utils/collegeData";
import { useMemo } from "react";
import { Pagination } from "@mantine/core";

const PAGE_SIZE = 10;

/* if sorting is needed, then create an object right here that says */

const CollegeInfoTable = ({ searchCriteria }) => {
  /* for now leave the search as is. but in future implement each word word by word searching like in VSCode
    if search is "sairam information tech":
      1. break each word, check if each word is in the college['college name'] and college['branch name'] combined,
      2. if not check if either of the split words are in college['college name'] and college['branch name'] 
      3. else, default checking like as already implemented
  */
  const collegesAfterFiltering = useMemo(() => {
    if (!searchCriteria || searchCriteria?.searchKey == "") return colleges;
    return colleges.filter((college) =>
      (college["College Name"] + college["Branch Name"])
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchCriteria.searchKey.toLowerCase().replace(/\s+/g, ""))
    );
  }, [searchCriteria]);

  const pagination = usePagination({
    total: parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1,
    initialPage: 1,
    siblings: 1,
  });

  // console.log("🚀 ~ CollegeInfoTable ~ pagination:", collegesAfterFiltering.slice(0, 3));

  return (
    <>
      <div className='w-full self-end flex'>
        <Pagination
          total={parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1}
          value={pagination.active}
          onChange={pagination.setPage}
          className='ml-auto'
          classNames={{
            control: {
              opacity: "10%",
            },
          }}
        ></Pagination>
      </div>

      {/* Table Header */}
      <div className='overflow-x-scroll md:overflow-x-hidden flex flex-col mt-6 w-full transition-all'>
        <div className='flex justify-around min-w-fit md:min-w-[unset] items-center md:m-0 mt-1 mx-1 p-1.5 md:p-4 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200 shadow sticky top-0 bg-white'>
          <h2 className='flex-1 font-medium max-w-28 min-w-16'>S.No.</h2>
          <h2 className='flex-1 font-medium max-w-36 min-w-16'>College Code</h2>
          <h2 className='min-w-44 max-w-96 flex-1 font-medium'>College Name</h2>
          <h2 className='max-w-40 flex-1 font-medium min-w-36'>
            Branch Name
          </h2>
          <h2 className='max-w-36 flex-1 font-medium min-w-16'>
            Branch Code
          </h2>
          {/* <h2 className='max-w-36 flex-1 font-medium'>
            {searchCriteria.Category} Cutoff
          </h2> */}
        </div>

        {/* Table body */}
        {collegesAfterFiltering
          .slice(
            PAGE_SIZE * pagination.active - PAGE_SIZE,
            PAGE_SIZE * pagination.active
          )
          .map((college, i) => (
            <div
              key={college["S.No"]}
              className='flex transition-all min-w-fit md:m-0 mx-1 md:min-w-[unset] justify-around items-center outline p-1.5 md:p-1 min-h-32 animate-fade-in overflow-hidden bg-white outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:rounded-es-md'
            >
              <h2 className='flex-1 text-sm max-w-28 min-w-16'>
                <p className='ml-2'>{i + 1}</p>
              </h2>
              <h2 className='flex-1 text-sm max-w-36 min-w-16'>
                {college["College Code"]}
              </h2>
              <h2 className='min-w-44 max-w-96 flex-1 text-sm'>
                {college["College Name"]}
              </h2>
              <h2 className='max-w-40 flex-1 text-sm pl-2 min-w-36 break-words'>
                {college["Branch Name"]}
              </h2>
              <h2 className='max-w-36 flex-1 text-sm pl-2 min-w-16'>
                {college["Branch Code"]}
              </h2>
              {/* <h2 className='max-w-36 flex-1 text-sm'>
                {college[`${searchCriteria.Category} - Cutoff`]}
              </h2> */}
            </div>
          ))}
      </div>
      <div className='w-full self-end flex'>
        <Pagination
          total={parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1}
          value={pagination.active}
          onChange={pagination.setPage}
          className='ml-auto'
        />
      </div>
    </>
  );
};

export default CollegeInfoTable;
