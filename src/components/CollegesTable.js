import { usePagination } from "@mantine/hooks";
import collegesData from "../utils/collegeData";
import { useEffect, useMemo } from "react";
import { Pagination, Tooltip } from "@mantine/core";
import { districtData } from "@/utils/collegeDistrictData";
import { NBAdata } from "@/utils/collegeCourseNBAData";

const PAGE_SIZE = 25;

/* if sorting is needed, then create an object right here like { columnName: sortingFn, .... } */
/* then on click, find the corresponding fn from this object and sort the rows based on the function and then return the filtered colleges */
const colleges = {
  GC: collegesData.GC.map((college) => {
    const collData = NBAdata.find(
      (coll) =>
        coll["COLLEGE CODE"] == college["College Code"] &&
        coll.BRANCH == college["Branch Code"]
    );
    const collDataDist = districtData.find(coll => coll["COLLEGE CODE"] == college["College Code"]);
    return {
      ...college,
      nba: collData?.["NBA Accredited"]
        ? collData["NBA Accredited"]
          ? typeof collData["NBA Accredited"] == "number"
            ? "yes"
            : collData["NBA Accredited"].toString().toLowerCase() == "yes"
            ? "yes"
            : "no"
          : "no"
        : "no",
      autonomous: collDataDist?.["College Status"]
        ? collDataDist["College Status"] == "Autonomous"
          ? "Autonomous"
          : "Non-Autonomous"
        : "Unknown",
    };
  }),
  SPF: collegesData.SPF.map((college) => {
    const collData = NBAdata.find(
      (coll) =>
        coll["COLLEGE CODE"] == college["College Code"] &&
        coll.BRANCH == college["Branch Code"]
    );
    const collDataDist = districtData.find(coll => coll["COLLEGE CODE"] == college["College Code"]);
    return {
      ...college,
      nba: collData?.["NBA Accredited"]
        ? collData["NBA Accredited"]
          ? typeof collData["NBA Accredited"] == "number"
            ? "yes"
            : collData["NBA Accredited"].toString().toLowerCase() == "yes"
            ? "yes"
            : "no"
          : "no"
        : "no",
      autonomous: collDataDist?.["College Status"]
        ? collDataDist["College Status"] == "Autonomous"
          ? "Autonomous"
          : "Non-Autonomous"
        : "Unknown",
    };
  }),
};

const CollegesTable = ({ searchCriteria }) => {
  const collegesAfterFiltering = useMemo(
    () =>
      ["GC", "SPF", "VOC"].includes(searchCriteria.cutoffCategory)
        ? colleges[searchCriteria.cutoffCategory]
            .filter(
              (college) =>
                (searchCriteria?.Dept == "ALL"
                  ? true
                  : searchCriteria?.Dept.includes(
                      college["Branch Name"].replace(/\s+/g, "").toUpperCase()
                    )) &&
                college[`${searchCriteria.Category} - Cutoff`] >=
                  parseFloat(searchCriteria.MinCutoff) &&
                college[`${searchCriteria.Category} - Cutoff`] <=
                  parseFloat(searchCriteria.MaxCutoff) &&
                (college["College Name"]
                  .toLowerCase()
                  .replace(/\s+/g, "")
                  .includes(
                    searchCriteria.searchKey.toLowerCase().replace(/\s+/g, "")
                  ) ||
                  college["College Code"]
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(
                      searchCriteria.searchKey.toLowerCase().replace(/\s+/g, "")
                    ))
            )
            .filter((college) =>
              searchCriteria?.DistrictKey && searchCriteria?.DistrictKey?.length > 0
                ? searchCriteria?.DistrictKey == "ALL"
                  ? true
                  : districtData.find(
                      (dist) =>
                        searchCriteria?.DistrictKey.includes(dist["District "]) &&
                        dist["COLLEGE CODE"] == college["College Code"]
                    )
                : true
            )
            .sort(
              (a, b) =>
                parseInt(b[`${searchCriteria.Category} - Cutoff`]) -
                parseInt(a[`${searchCriteria.Category} - Cutoff`])
            )
        : [],
    [searchCriteria]
  );

  const pagination = usePagination({
    total: parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1,
    initialPage: 1,
    siblings: 1,
  });

  useEffect(() => pagination.setPage(1), [searchCriteria.searchKey]);

  if (!searchCriteria.Dept) return <p>Invalid Search Criteria!</p>;

  return (
    <>
      <p className='ml-2 w-full text-left'>
        <span className='font-medium'>{collegesAfterFiltering.length}</span>{" "}
        college(s) found
      </p>
      <div className='overflow-x-scroll flex flex-col w-full transition-all'>
        <div className='flex justify-around min-w-fit md:min-w-[unset] mt-1 mx-1 items-center p-2 md:p-4 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200 sticky top-0 bg-white shadow'>
          <h2 className='flex-1 font-medium min-w-16 max-w-28'>S.No.</h2>
          <h2 className='flex-1 font-medium min-w-20 max-w-36'>College Code</h2>
          <h2 className='min-w-44 max-w-96 flex-1 font-medium'>College Name</h2>
          <h2 className='max-w-44 flex-1 font-medium min-w-36 mx-2'>
            Department
          </h2>
          <h2 className='max-w-36 flex-1 font-medium min-w-20'>
            {searchCriteria.Category} {searchCriteria.filterBy}
          </h2>
        </div>

        {collegesAfterFiltering
          .slice(
            PAGE_SIZE * pagination.active - PAGE_SIZE,
            PAGE_SIZE * pagination.active
          )
          .map((college, i) => (
            <div
              key={college["S.No"]}
              // onMouseOver={(e) => e.currentTarget.classList.replace('h-16', 'h-auto')}
              // onMouseOut={(e) => e.currentTarget.classList.replace('h-auto', 'h-16')}
              className={`flex transition-all min-w-fit md:min-w-[unset] mx-1 justify-around items-center outline p-2 md:p-1 min-h-32 animate-fade-in overflow-hidden ${
                i % 2 != 0 ? "bg-white" : "bg-blue-50/70"
              } outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:mb-1 last-of-type:rounded-es-md`}
            >
              <h2 className='flex-1 text-sm min-w-16 max-w-28'>
                <p className='ml-2'>{i + 1}</p>
              </h2>
              <h2 className='flex-1 text-sm min-w-20 max-w-36'>
                {college["College Code"]}
              </h2>
              <h2 className='min-w-44 max-w-96 text-balance flex-1 text-sm'>
                {college["College Name"]}
                <br />
                <div className='flex h-fit gap-1 mt-1 flex-wrap'>
                  <p className='px-1.5 cursor-default py-3/4 rounded-full text-xs text-amber-500 bg-amber-50 w-fit h-fit'>
                    {college.autonomous}
                  </p>
                </div>
              </h2>
              <h2 className='max-w-44 flex-1 min-w-36 text-sm mx-2 text-balance'>
                {college["Branch Name"].toUpperCase()}
                <br />
                {college["nba"] != "no" && (
                  <Tooltip
                    label='NBA Accredited'
                    withArrow
                    styles={{
                      tooltip: {
                        fontSize: "12px",
                      },
                    }}
                  >
                    <p className='px-1.5 py-3/4 rounded-full text-xs text-violet-500 bg-violet-50 w-fit h-fit cursor-default'>
                      NBA
                    </p>
                  </Tooltip>
                )}
              </h2>
              <h2 className='max-w-36 flex-1 min-w-20 text-sm'>
                {
                  college[
                    `${searchCriteria.Category} - ${searchCriteria.filterBy}`
                  ]
                }
              </h2>
            </div>
          ))}
      </div>
      <div className='w-full self-start flex md:flex-row flex-col'>
        <p className='ml-2'>
          <span className='font-medium'>{collegesAfterFiltering.length}</span>{" "}
          college(s) found
        </p>
        <Pagination
          total={parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1}
          value={pagination.active}
          onChange={pagination.setPage}
          className='md:ml-auto'
        />
      </div>
    </>
  );
};

export default CollegesTable;
