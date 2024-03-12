import { usePagination } from "@mantine/hooks";
import colleges from "../utils/collegeData";
import { useMemo } from "react";
import { Pagination } from "@mantine/core";

const PAGE_SIZE = 10;

/* if sorting is needed, then create an object right here that says */

const CollegeInfoTable = ({ searchCriteria }) => {
    console.log('server component ah');
  const collegesAfterFiltering = useMemo(
    () => {
      if (!searchCriteria || searchCriteria?.searchKey == '') return colleges
      return colleges.filter((college) =>
        college["College Name"]
          .toLowerCase()
          .replace(/\s+/g, "")
          .trim()
          .includes(
            searchCriteria.searchKey.toLowerCase().replace(/\s+/g, "").trim()
          )
      );
    },
    [searchCriteria]
  );

  const pagination = usePagination({
    total: parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1,
    initialPage: 1,
    siblings: 1,
  });

  console.log("🚀 ~ CollegeInfoTable ~ pagination:", collegesAfterFiltering.slice(0, 3));

  return (
    <>
      <div className='w-full self-end flex'>
        <Pagination
          total={parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1}
          value={pagination.active}
          onChange={pagination.setPage}
          className='ml-auto'
        />
      </div>

      {/* Table Header */}
      <div className='flex flex-col mt-6 w-full transition-all'>
        <div className='flex justify-around items-center p-4 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200'>
          <h2 className='flex-1 font-medium max-w-28'>S.No.</h2>
          <h2 className='flex-1 font-medium max-w-36'>College Code</h2>
          <h2 className='min-w-44 max-w-96 flex-1 font-medium'>College Name</h2>
          <h2 className='max-w-36 flex-1 font-medium'>Department Name</h2>
          <h2 className='max-w-36 flex-1 font-medium'>Department Code</h2>
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
              className='flex transition-all justify-around items-center outline p-1 min-h-32 animate-fade-in overflow-hidden bg-white outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:rounded-es-md'
            >
              <h2 className='flex-1 text-sm max-w-28'>
                <p className='ml-2'>{i + 1}</p>
              </h2>
              <h2 className='flex-1 text-sm max-w-36'>
                {college["College Code"]}
              </h2>
              <h2 className='min-w-44 max-w-96 flex-1 text-sm'>
                {college["College Name"]}
              </h2>
              <h2 className='max-w-36 flex-1 text-sm pl-2'>
                {college["Branch Name"]}
              </h2>
              <h2 className='max-w-36 flex-1 text-sm pl-2'>
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
