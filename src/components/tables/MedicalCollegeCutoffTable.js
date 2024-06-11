import { medicalCutoffData } from "@/utils/medicalCutoffData";
import { medicalMQData } from "@/utils/medicalMQCutoffData";
import { medicaMCC_AIQdata } from "@/utils/medicalMCC-AIQ";
import { Pagination } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useEffect, useMemo } from "react";
import { medicalMCC_Deemed } from "@/utils/medicalMCC-Deemed";

const PAGE_SIZE = 25;

export default function MedicalCollegeCutoffTable({ searchCriteria }) {
  console.log("🚀 ~ searchCriteria:", searchCriteria);

  const results = useMemo(() => {
    const dataBeforeFilter =
      searchCriteria?.counsellingCategory == "STATE"
        ? searchCriteria?.quota?.includes("MQ")
          ? medicalMQData.filter(
              (college) =>
                college[`${searchCriteria?.quota} - NEET Mark`] >=
                  parseFloat(searchCriteria?.MinNEET) &&
                college[`${searchCriteria?.quota} - NEET Mark`] <=
                  parseFloat(searchCriteria?.MaxNEET)
            )
          : medicalCutoffData.filter(
              (college) =>
                college[`${searchCriteria?.community} - NEET Mark`] >=
                  parseFloat(searchCriteria?.MinNEET) &&
                college[`${searchCriteria?.community} - NEET Mark`] <=
                  parseFloat(searchCriteria?.MaxNEET)
            )
        : searchCriteria?.quota == "AIQ"
        ? medicaMCC_AIQdata.filter(
            (college) =>
              college[`${searchCriteria?.community} - Rank`] >=
                parseFloat(searchCriteria?.MinNEET)
              )
              : medicalMCC_Deemed.filter(college => 
                college[`${searchCriteria?.quota} - Rank`] >=
                  parseFloat(searchCriteria?.MinNEET)
              );
    return dataBeforeFilter
      .filter((college) =>
        searchCriteria?.searchKey
          ? college["College Name"]
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(
                searchCriteria.searchKey.toLowerCase().replace(/\s+/g, "")
              )
          : true
      )
      .sort((a, b) =>
        searchCriteria?.counsellingCategory == "STATE"
          ? b[
              `${
                searchCriteria?.quota?.includes("MQ")
                  ? searchCriteria?.quota
                  : searchCriteria?.community
              } - NEET Mark`
            ] -
            a[
              `${
                searchCriteria?.quota?.includes("MQ")
                  ? searchCriteria?.quota
                  : searchCriteria?.community
              } - NEET Mark`
            ]
          : a[
              `${
                searchCriteria?.quota?.includes("Deemed")
                  ? searchCriteria?.quota
                  : searchCriteria?.community
              } - Rank`
            ] -
            b[
              `${
                searchCriteria?.quota?.includes("Deemed")
                  ? searchCriteria?.quota
                  : searchCriteria?.community
              } - Rank`
            ]
      );
  }, [searchCriteria]);

  const pagination = usePagination({
    total: parseInt(results.length / PAGE_SIZE) + 1,
    initialPage: 1,
    sibling: 1,
  });

  useEffect(() => pagination.setPage(1), [searchCriteria]);

  // if (!searchCriteria.community) return <p>Invalid Search Criteria!</p>;

  return (
    <>
      <p className='ml-2 w-full text-left'>
        <span className='font-medium'>{results.length}</span> college(s) found
      </p>
      <div className='overflow-x-auto flex flex-col w-full transition-all'>
        <div className='flex justify-around min-w-fit md:min-w-[unset] mt-1 mx-1 items-center p-2 md:p-4 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200 sticky top-0 bg-white shadow'>
          <h2 className='flex-1 font-medium min-w-16 max-w-28'>S.No.</h2>
          <h2 className='min-w-44 max-w-96 flex-1 font-medium'>College Name</h2>
          <h2 className='flex-1 font-medium min-w-20 max-w-36'>Branch</h2>
          <h2 className='max-w-36 flex-1 font-medium min-w-20'>
            {searchCriteria?.quota?.includes("MQ") ||
            searchCriteria?.quota?.includes("Deemed")
              ? searchCriteria?.quota
              : searchCriteria?.community}{" "}
            {" "}
            {searchCriteria?.counsellingCategory == "STATE"
              ? searchCriteria.filterBy
              : "Rank"}
          </h2>
        </div>

        {results
          .slice(
            PAGE_SIZE * pagination.active - PAGE_SIZE,
            PAGE_SIZE * pagination.active
          )
          .map((college, i) => (
            <div
              key={i}
              className={`flex hover:bg-sky-200/70 transition-all min-w-fit md:min-w-[unset] mx-1 justify-around items-center outline p-2 md:p-1 min-h-20 animate-fade-in overflow-hidden ${
                i % 2 != 0 ? "bg-white" : "bg-blue-50/70"
              } outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:mb-1 last-of-type:rounded-es-md`}
            >
              <h2 className='flex-1 text-sm min-w-16 max-w-28'>
                {i + 1}
              </h2>
              <h2 className='min-w-44 max-w-96 text-balance break-words flex-1 text-sm'>
                {college["College Name"].split(",").join(", ")}
              </h2>
              <h2 className='flex-1 text-sm min-w-20 max-w-36'>
                {searchCriteria?.Course}
              </h2>
              <h2 className='max-w-36 flex-1 min-w-20 text-sm'>
                {
                  college[
                    `${
                      searchCriteria?.quota?.includes("MQ") ||
                      searchCriteria?.quota?.includes("Deemed")
                        ? searchCriteria?.quota
                        : searchCriteria?.community
                    } - ${
                      searchCriteria?.counsellingCategory == "STATE"
                        ? searchCriteria.filterBy
                        : "Rank"
                    }`
                  ]
                }
              </h2>
            </div>
          ))}
      </div>
      <div className='w-full self-start flex md:flex-row flex-col'>
        <p className='ml-2'>
          <span className='font-medium'>{results.length}</span> college(s) found
        </p>
        <Pagination
          total={parseInt(results.length / PAGE_SIZE) + 1}
          value={pagination.active}
          onChange={pagination.setPage}
          className='md:ml-auto'
        />
      </div>
    </>
  );
}
