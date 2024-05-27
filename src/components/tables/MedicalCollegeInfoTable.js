import { medicalCutoffData } from "@/utils/medicalCutoffData";
import { medicalMCC_Deemed } from "@/utils/medicalMCC-Deemed";
import { Pagination } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useMemo } from "react";

const PAGE_SIZE = 25;
const communityColors = [
  "text-amber-500",
  "text-teal-500",
  "text-fuchsia-500",
  "text-cyan-500",
  "text-yellow-500",
  "text-emerald-500",
  "text-rose-500",
];
const allCasteCategories = ["OC", "BC", "BCM", "MBC & DNC", "SC", "SCA", "ST"];

const slugToCategoryMap = {
  Govt: ["Govt"],
  SF: ["SF", "PU"],
  Deemed: ["Deemed - NRI", "Deemed - Management"],
};

export default function MedicalCollegeInfoTable({ searchCriteria }) {
  console.log("🚀 ~ MedicalCollegeInfoTable ~ searchCriteria:", searchCriteria);
  const collegesAfterFiltering = useMemo(
    () =>
      searchCriteria.collegeType == "Deemed"
        ? medicalMCC_Deemed.filter(
            (college) =>
              college["College Name"]
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(
                  searchCriteria.searchKey?.toLowerCase().replace(/\s+/g, "")
                ) &&
                college[`${searchCriteria.sfpu} - Rank`] > 0
          )
        : medicalCutoffData.filter((college) =>
            college["College Name"]
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(
                searchCriteria.searchKey?.toLowerCase().replace(/\s+/g, "")
              ) && (searchCriteria.collegeType == "SF"
              ? college["College Type"] == searchCriteria.sfpu
              : college["College Type"] == searchCriteria.collegeType)
          ),
    [searchCriteria]
  );

  const pagination = usePagination({
    total: parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1,
    initialPage: 1,
    siblings: 1,
  });

  return (
    <>
      <div className='w-full self-end flex'>
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
        ></Pagination>
      </div>

      <div className='overflow-x-scroll md:overflow-x-hidden flex flex-col mt-6 w-full transition-all'>
        <div className='flex justify-around min-w-fit md:min-w-[unset] items-center mt-1 mx-1 p-1.5 md:p-3 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200 shadow sticky top-0 bg-white'>
          <h2 className='flex-1 max-w-16 min-w-14'>S.No.</h2>
          <h2 className='min-w-52 max-w-96 flex-1 mx-2'>College Name</h2>
          <h2 className='max-w-28 flex-1 min-w-24 mx-2'>Branch Name</h2>
          {searchCriteria.collegeType == "Deemed" ? (
            <h2 className='max-w-36 flex-1 min-w-24'>Rank</h2>
          ) : (
            allCasteCategories.map((cat, i) => (
              <h2
                key={i}
                className={`flex-1 text-sm md:min-w-12 md:max-w-16 ${
                  communityColors[i]
                } ${
                  searchCriteria.filterBy == "State Rank"
                    ? "min-w-16 max-w-20"
                    : "min-w-12 max-w-16"
                }`}
              >
                {cat}
              </h2>
            ))
          )}
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
              className={`flex hover:bg-sky-200/70 transition-all min-w-fit mx-1 md:min-w-[unset] justify-around items-center outline p-1.5 md:p-1 min-h-24 last-of-type:mb-1 animate-fade-in overflow-hidden ${
                i % 2 != 0 ? "bg-white" : "bg-blue-50/70"
              } outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:rounded-es-md`}
            >
              <h2 className='flex-1 text-sm max-w-16 min-w-14'>
                <p className='ml-2'>{i + 1}</p>
              </h2>
              <h2 className='min-w-52 max-w-96 flex-1 mx-2 text-sm'>
                {college["College Name"]}
              </h2>
              <p className='max-w-28 flex-1 min-w-24 mx-2 text-sm'>MBBS</p>
              {searchCriteria.collegeType == "Deemed" ? (
                <h2 className='max-w-36 flex-1 min-w-24'>
                  {college[`${searchCriteria.sfpu} - Rank`]}
                </h2>
              ) : (
                allCasteCategories.map((key, i) => (
                  <h2
                    key={i}
                    className={`flex-1 text-sm md:min-w-12 md:max-w-16 ${
                      communityColors[i]
                    } ${
                      searchCriteria.filterBy == "State Rank"
                        ? "min-w-16 max-w-20"
                        : "min-w-12 max-w-16"
                    }`}
                  >
                    {college[`${key} - ${searchCriteria.filterBy}`]
                      ? college[`${key} - ${searchCriteria.filterBy}`]
                          .toString()
                          .includes(".")
                        ? college[
                            `${key} - ${searchCriteria.filterBy}`
                          ].toFixed(1)
                        : college[`${key} - ${searchCriteria.filterBy}`]
                      : "-"}
                  </h2>
                ))
              )}
            </div>
          ))}
      </div>
      <div className='w-full md:self-end self-start flex'>
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
}
