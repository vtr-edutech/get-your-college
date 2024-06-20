import { medicalCutoffData } from "@/utils/medicalCutoffData";
import { medicalMQData } from "@/utils/medicalMQCutoffData";
import { medicaMCC_AIQdata } from "@/utils/medicalMCC-AIQ";
import { Pagination } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useEffect, useMemo } from "react";
import { medicalMCC_Deemed } from "@/utils/medicalMCC-Deemed";
import { medicalAIQRounds } from "@/utils/medicalAIQ-Rounds";
import { medicalDeemedRounds } from "@/utils/medicalDeemed-Rounds";

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
                  parseFloat(searchCriteria?.MaxNEET),
            )
          : medicalCutoffData[searchCriteria?.Course ?? "MBBS"].filter(
              (college) =>
                college.Round == searchCriteria?.medicalRound &&
                college[`${searchCriteria?.community} - NEET Mark`] >=
                  parseFloat(searchCriteria?.MinNEET) &&
                college[`${searchCriteria?.community} - NEET Mark`] <=
                  parseFloat(searchCriteria?.MaxNEET),
            )
        : searchCriteria?.quota == "AIQ"
          ? medicalAIQRounds.filter(
              (college) =>
                college[
                  `${searchCriteria?.medicalRound ?? "Round-1"} ${searchCriteria?.community} - Rank`
                ] >= parseFloat(searchCriteria?.MinNEET),
            )
          : medicalDeemedRounds.filter(
              (college) =>
                college[
                  `${searchCriteria?.medicalRound ?? "Round-1"} ${searchCriteria?.quota} - Rank`
                ] >= parseFloat(searchCriteria?.MinNEET),
            );
    return dataBeforeFilter
      .filter((college) =>
        searchCriteria?.searchKey
          ? college["College Name"]
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(
                searchCriteria.searchKey.toLowerCase().replace(/\s+/g, ""),
              )
          : true,
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
              `${searchCriteria?.medicalRound ?? "Round-1"} ${
                searchCriteria?.quota?.includes("Deemed")
                  ? searchCriteria?.quota
                  : searchCriteria?.community
              } - Rank`
            ] -
            b[
              `${searchCriteria?.medicalRound ?? "Round-1"} ${
                searchCriteria?.quota?.includes("Deemed")
                  ? searchCriteria?.quota
                  : searchCriteria?.community
              } - Rank`
            ],
      );
  }, [searchCriteria]);

  const pagination = usePagination({
    total: parseInt(results.length / PAGE_SIZE) + 1,
    initialPage: 1,
    sibling: 1,
  });

  useEffect(() => pagination.setPage(1), [searchCriteria]);

  const dataSelectorString = `${searchCriteria?.counsellingCategory != "STATE" ? `${searchCriteria?.medicalRound ?? "Round-1"} ` : ""}${searchCriteria?.quota?.includes("MQ") || searchCriteria?.quota?.includes("Deemed") ? searchCriteria?.quota : searchCriteria?.community} - ${searchCriteria?.counsellingCategory == "STATE" ? searchCriteria.filterBy : "Rank"}`;

  return (
    <>
      <p className="ml-2 w-full text-left">
        <span className="font-medium">{results.length}</span>{" "}
        <span className="font-medium">{searchCriteria?.Course}</span> college(s)
        found in{" "}
        <span className="font-medium">{searchCriteria?.medicalRound}</span>
      </p>
      <div className="flex w-full flex-col overflow-x-auto transition-all">
        <div className="sticky top-0 mx-1 mt-1 flex min-w-fit items-center justify-around rounded-se-lg rounded-ss-lg bg-white p-2 py-6 shadow outline outline-1 outline-gray-200 md:min-w-[unset] md:p-4">
          <h2 className="min-w-16 max-w-28 flex-1 font-medium">S.No.</h2>
          <h2 className="min-w-44 max-w-96 flex-1 font-medium">College Name</h2>
          <h2 className="min-w-20 max-w-36 flex-1 font-medium">Branch</h2>
          <h2 className="min-w-20 max-w-36 flex-1 font-medium">
            {searchCriteria?.quota?.includes("MQ") ||
            searchCriteria?.quota?.includes("Deemed")
              ? searchCriteria?.quota
              : searchCriteria?.community}{" "}
            {searchCriteria?.counsellingCategory == "STATE"
              ? searchCriteria.filterBy
              : "Rank"}
          </h2>
        </div>

        {results
          .slice(
            PAGE_SIZE * pagination.active - PAGE_SIZE,
            PAGE_SIZE * pagination.active,
          )
          .map((college, i) => (
            <div
              key={i}
              className={`mx-1 flex min-h-20 min-w-fit animate-fade-in items-center justify-around overflow-hidden p-2 outline transition-all hover:bg-sky-200/70 md:min-w-[unset] md:p-1 ${
                i % 2 != 0 ? "bg-white" : "bg-blue-50/70"
              } outline-1 outline-gray-200 last-of-type:mb-1 last-of-type:rounded-ee-md last-of-type:rounded-es-md`}
            >
              <h2 className="min-w-16 max-w-28 flex-1 text-sm">{i + 1}</h2>
              <h2 className="min-w-44 max-w-96 flex-1 text-balance break-words text-sm">
                {college["College Name"].split(",").join(", ")}
              </h2>
              <h2 className="min-w-20 max-w-36 flex-1 text-sm">
                {searchCriteria?.Course}
              </h2>
              <h2 className="min-w-20 max-w-36 flex-1 text-sm">
                {college[dataSelectorString]}
              </h2>
            </div>
          ))}
      </div>
      <div className="flex w-full flex-col self-start md:flex-row">
        <p className="ml-2">
          <span className="font-medium">{results.length}</span> college(s) found
        </p>
        <Pagination
          total={parseInt(results.length / PAGE_SIZE) + 1}
          value={pagination.active}
          onChange={pagination.setPage}
          className="md:ml-auto"
        />
      </div>
    </>
  );
}
