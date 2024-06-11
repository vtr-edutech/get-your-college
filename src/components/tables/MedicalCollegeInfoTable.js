
import { medicalMCC_Deemed } from "@/utils/medicalMCC-Deemed";
import { medicaMCC_AIQdata } from "@/utils/medicalMCC-AIQ";
import { medicalCutoffData } from "@/utils/medicalCutoffData";
import { Pagination } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useMemo } from "react";

const PAGE_SIZE = 25;
const communityColors = ["text-amber-500", "text-teal-500", "text-fuchsia-500", "text-cyan-500", "text-yellow-500", "text-emerald-500", "text-rose-500"];

const allCasteCategories = {
"State": ["OC", "BC", "BCM", "MBC & DNC", "SC", "SCA", "ST"],
  "AIQ": ["OC", "OBC", "SC", "ST", "EWS"]
};

const slugToCategoryMap = {
  Govt: ["Govt"],
  SF: ["SF", "PU"],
  Deemed: ["Deemed - NRI", "Deemed - Management"],
};

export default function MedicalCollegeInfoTable({ searchCriteria }) {
  const collegesAfterFiltering = useMemo(() => {
    let data;
    if (searchCriteria.collegeType === "Deemed") {
      data = medicalMCC_Deemed;
    } else if (searchCriteria.collegeState === "State") {
      data = medicalCutoffData;
    } else {
      data = medicaMCC_AIQdata;
    }

    return data.filter(college => {
      const collegeName = college["College Name"].toLowerCase().replace(/\s+/g, "");
      const searchKey = searchCriteria.searchKey?.toLowerCase().replace(/\s+/g, "");

      if (searchCriteria.collegeType === "Deemed") {
        return collegeName.includes(searchKey) && college[`${searchCriteria.sfpu} - Rank`] > 0;
      } else if (searchCriteria.collegeState === "State") {
        return collegeName.includes(searchKey) && college["College Type"] === (searchCriteria.collegeType === "SF" ? searchCriteria.sfpu : searchCriteria.collegeType);
      } else {
        return collegeName.includes(searchKey);
      }
    });
  }, [searchCriteria]);

  const pagination = usePagination({
    total: Math.ceil(collegesAfterFiltering.length / PAGE_SIZE),
    initialPage: 1,
    siblings: 1,
  });

  const renderCollegeData = (college, i) => (
    <div key={i} className={`mx-1 flex min-h-24 min-w-fit animate-fade-in items-center justify-around overflow-hidden p-1.5 outline transition-all last-of-type:mb-1 hover:bg-sky-200/70 md:min-w-[unset] md:p-1 ${i % 2 !== 0 ? "bg-white" : "bg-blue-50/70"} outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:rounded-es-md`}>
      <h2 className="min-w-14 max-w-16 flex-1 text-sm"><p className="ml-2">{i + 1}</p></h2>
      <h2 className="mx-2 min-w-52 max-w-96 flex-1 text-sm">{college["College Name"]}</h2>
      <p className="mx-2 min-w-24 max-w-28 flex-1 text-sm">MBBS</p>
      {searchCriteria.collegeType === "Deemed" ? (
        <p className="min-w-24 max-w-36 flex-1 text-sm">{new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 8 }).format(college[`${searchCriteria.sfpu} - Rank`])}</p>
      ) : (
        allCasteCategories[searchCriteria.collegeState].map((key, i) => (
          <h2 key={i} className={`flex-1 text-sm md:min-w-12 md:max-w-16 ${communityColors[i]} ${searchCriteria.filterBy === "State Rank" ? "min-w-16 max-w-20" : "min-w-12 max-w-16"}`}>
            {college[`${key} - ${searchCriteria.filterBy}`] ? college[`${key} - ${searchCriteria.filterBy}`].toString().includes(".") ? college[`${key} - ${searchCriteria.filterBy}`].toFixed(1) : college[`${key} - ${searchCriteria.filterBy}`] : "-"}
          </h2>
        ))
      )}
    </div>
  );

  return (
    <>
      <div className="flex w-full self-end">
        {searchCriteria.searchKey.trim() !== "" && (
          <p className="ml-2"><span className="font-medium">{collegesAfterFiltering.length}</span> college(s) found</p>
        )}
        <Pagination total={Math.ceil(collegesAfterFiltering.length / PAGE_SIZE)} value={pagination.active} onChange={pagination.setPage} className="ml-auto" />
      </div>

      <div className="mt-6 flex w-full flex-col overflow-x-scroll transition-all md:overflow-x-hidden">
        <div className="sticky top-0 mx-1 mt-1 flex min-w-fit items-center justify-around rounded-se-lg rounded-ss-lg bg-white p-1.5 shadow outline outline-1 outline-gray-200 md:min-w-[unset] md:p-3">
          <h2 className="min-w-14 max-w-16 flex-1">S.No.</h2>
          <h2 className="mx-2 min-w-52 max-w-96 flex-1">College Name</h2>
          <h2 className="mx-2 min-w-24 max-w-28 flex-1">Branch Name</h2>
          {searchCriteria.collegeType === "Deemed" ? (
            <h2 className="min-w-24 max-w-36 flex-1">Rank</h2>
          ) : (
            allCasteCategories[searchCriteria.collegeState].map((cat, i) => (
              <h2 key={i} className={`flex-1 text-sm md:min-w-12 md:max-w-16 ${communityColors[i]} ${searchCriteria.filterBy === "State Rank" ? "min-w-16 max-w-20" : "min-w-12 max-w-16"}`}>{cat}</h2>
            ))
          )}
        </div>

        {collegesAfterFiltering.slice(PAGE_SIZE * pagination.active - PAGE_SIZE, PAGE_SIZE * pagination.active).map(renderCollegeData)}
      </div>

      <div className="flex w-full self-start md:self-end">
        {searchCriteria.searchKey.trim() !== "" && (
          <p className="ml-2"><span className="font-medium">{collegesAfterFiltering.length}</span> college(s) found</p>
        )}
        <Pagination total={Math.ceil(collegesAfterFiltering.length / PAGE_SIZE)} value={pagination.active} onChange={pagination.setPage} className="ml-auto" />
      </div>
    </>
  );
}
