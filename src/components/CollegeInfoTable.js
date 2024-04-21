import { usePagination } from "@mantine/hooks";
import colleges from "../utils/collegeData";
import { useEffect, useMemo } from "react";
import { Pagination, Tooltip } from "@mantine/core";
import { districtData } from "@/utils/collegeDistrictData";
import { NBAdata } from "@/utils/collegeCourseNBAData";

const PAGE_SIZE = 10;
const allCasteCategories = Object.keys(colleges[1]).filter((key) =>
  key.includes("Cutoff")
);

const communityColors = [
  'text-amber-500',
  'text-teal-500',
  'text-fuchsia-500',
  'text-cyan-500',
  'text-yellow-500',
  'text-emerald-500',
  'text-rose-500',
]

/* if sorting is needed, then create an object right here that says */

const CollegeInfoTable = ({ searchCriteria }) => {
  /* for now leave the search as is. but in future implement each word word by word searching like in VSCode
    if search is "sairam information tech":
      1. break each word, check if each word is in the college['college name'] and college['branch name'] combined,
      2. if not check if either of the split words are in college['college name'] and college['branch name'] 
      3. else, default checking like as already implemented
  */
  const collegesAfterFiltering = useMemo(() => {
    var collegeData = [];
    if (!searchCriteria || searchCriteria?.searchKey == "") collegeData = colleges;
    collegeData = colleges.filter((college) =>
      (
        college["College Name"] +
        college["Branch Name"] +
        college["College Code"]
      )
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchCriteria.searchKey.toLowerCase().replace(/\s+/g, ""))
    );
    return collegeData
      .map((college) => {
        const collegeMiscDetails = districtData.find(
          (collegeMisc) =>
            collegeMisc["COLLEGE CODE"] == college["College Code"]
        );
        const courseNBADetails = NBAdata.find(course => ((course["COLLEGE CODE"] == college['College Code']) && (course['BRANCH'] == college['Branch Code'])))
        console.log(college["Branch Code"], college['College Code'], courseNBADetails);
        return {
          ...college,
          "COLLEGE STATUS": collegeMiscDetails ? collegeMiscDetails["College Status"]: 'N/A',
          "MINORITY STATUS": collegeMiscDetails ? collegeMiscDetails["Minority Status"]: 'N/A',
          "NBA": (courseNBADetails && courseNBADetails['NBA Accredited'])? 
            (typeof courseNBADetails['NBA Accredited'] == 'number'? "yes": 
              courseNBADetails['NBA Accredited'].toString().toLowerCase() == "yes"? "yes": "no"): 'no'
        };
      });
  }, [searchCriteria]);

  const pagination = usePagination({
    total: parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1,
    initialPage: 1,
    siblings: 1,
  });

  // console.log(collegesAfterFiltering.slice(0, 10));

  useEffect(() => pagination.setPage(1), [searchCriteria.searchKey])

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
        <div className='flex justify-around min-w-fit md:min-w-[unset] items-center mt-1 mx-1 p-1.5 md:p-3 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200 shadow sticky top-0 bg-white'>
          <h2 className='flex-1 font-medium max-w-16 min-w-14'>S.No.</h2>
          <h2 className='flex-1 font-medium max-w-24 min-w-16 md:mx-2'>
            College Code
          </h2>
          <h2 className='min-w-52 max-w-96 flex-1 font-medium md:m-0 mx-2'>
            College Name
          </h2>
          <h2 className='max-w-40 flex-1 font-medium min-w-36 mx-2'>
            Branch Name
          </h2>
          <h2 className='max-w-28 flex-1 font-medium min-w-16 mx-2'>
            Branch Code
          </h2>
          {/* <h2 className='max-w-36 flex-1 font-medium min-w-24'>
            Cutoff
          </h2> */}
          {allCasteCategories.map((cat, i) => (
            <h2
              key={i}
              className={`max-w-16 flex-1 font-medium min-w-12 ${communityColors[i]}`}
            >
              {cat.split("-")[0]}
            </h2>
          ))}
        </div>

        {/* Table body */}
        {collegesAfterFiltering
          .slice(
            PAGE_SIZE * pagination.active - PAGE_SIZE,
            PAGE_SIZE * pagination.active
          )
          .map((college, i) => (
            <div
              key={i}
              className='flex transition-all min-w-fit mx-1 md:min-w-[unset] justify-around items-center outline p-1.5 md:p-1 min-h-32 last-of-type:mb-1 animate-fade-in overflow-hidden bg-white outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:rounded-es-md'
            >
              <h2 className='flex-1 text-sm max-w-16 min-w-14'>
                <p className='ml-2'>{i + 1}</p>
              </h2>
              <h2 className='flex-1 text-sm max-w-24 min-w-16 md:mx-2'>
                {college["College Code"]}
              </h2>
              <h2 className='min-w-52 max-w-96 flex-1 md:m-0 mx-2 text-sm'>
                {college["College Name"]}
                <br />
                <div className='flex h-fit gap-1 mt-1 flex-wrap'>
                  {
                    <p className='px-1.5 py-3/4 rounded-full text-xs text-cyan-600 bg-cyan-50 w-fit h-fit cursor-default'>
                      {college["COLLEGE STATUS"] != "N/A"
                        ? college["COLLEGE STATUS"] === "Autonomous"
                          ? "Autonomous"
                          : "Non-Autonomous"
                        : "Unknown"}
                    </p>
                  }
                  {
                    <p className='px-1.5 cursor-default py-3/4 rounded-full text-xs text-amber-500 bg-amber-50 w-fit h-fit'>
                      {college["MINORITY STATUS"] != "N/A"
                        ? college["MINORITY STATUS"].toLowerCase() == "yes"
                          ? "Minority"
                          : "Non-Minority"
                        : "Unknown"}
                    </p>
                  }
                </div>
              </h2>
              <h2 className='max-w-40 flex-1 text-sm min-w-36 break-words mx-2'>
                {college["Branch Name"]}
                {college["NBA"] != "no" ? (
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
                ) : (
                  <></>
                )}
              </h2>
              <h2 className='max-w-28 flex-1 flex gap-1 items-center text-sm min-w-16 mx-2'>
                {college["Branch Code"]}
              </h2>
              {allCasteCategories.map((key, i) => (
                <h2
                  key={i}
                  className={`max-w-16 flex-1 text-sm min-w-12 ${communityColors[i]}`}
                >
                  {college[key]
                    ? college[key].toString().includes(".")
                      ? college[key].toFixed(1)
                      : college[key]
                    : " "}
                </h2>
              ))}
            </div>
          ))}
      </div>
      <div className='w-full md:self-end self-start md:flex-row flex-col flex'>
        {searchCriteria.searchKey.trim() !== "" && (
          <p className='ml-2'>
            <span className='font-medium'>{collegesAfterFiltering.length}</span>{" "}
            college(s) found
          </p>
        )}
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
