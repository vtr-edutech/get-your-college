import { usePagination } from "@mantine/hooks";
import { DataTable } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import Button from "./ui/Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { reportTableData } from "@/utils/collegeChoiceListData";
import { districtData } from "@/utils/collegeDistrictData";
import { collegeChoiceListR2 } from "@/utils/collegeChoiceListRound2";
import { collegeChoiceListR3 } from "@/utils/collegeChoiceListRound3";
import { CUSTOM_BREAKPOINT } from "@/constants";
import { NBAdata } from "@/utils/collegeCourseNBAData";
import { Tooltip } from "@mantine/core";

const PAGE_SIZE = 25;

const data = reportTableData.map((data) => {
  const currCollEx = NBAdata.find(
    (coll) =>
      coll["COLLEGE CODE"] == data["College Code"] &&
      coll.BRANCH == data["Branch Code"]
  );
  return {
    ...data,
    round_2: collegeChoiceListR2.find(
      (coll) => coll["College Code"] == data["College Code"]
    ),
    round_3: collegeChoiceListR3.find(
      (coll) => coll["College Code"] == data["College Code"]
    ),
    nba: currCollEx?.["NBA Accredited"]
      ? currCollEx["NBA Accredited"]
        ? typeof currCollEx["NBA Accredited"] == "number"
          ? "yes"
          : currCollEx["NBA Accredited"].toString().toLowerCase() == "yes"
          ? "yes"
          : "no"
        : "no"
      : "no",
    autonomous: currCollEx?.["College Status"]
      ? currCollEx["College Status"] == "Autonomous"
        ? "Autonomous"
        : "Non-Autonomous"
      : "Unknown",
  };
});

// console.log("🚀 ~ data ~ data:", data)

const addCollegeToList = (colleges, setSelectedColleges) => {
  if (colleges.length < 1) {
    localStorage.removeItem("colleges");
  } else {
    localStorage.setItem(
      "colleges",
      colleges.map((college) => college.id)
    );
  }
  setSelectedColleges(colleges);
};

const ReportTable = ({ searchCriteria }) => {
  // console.log("🚀 ~ ReportTable ~ searchCriteria:", searchCriteria)
  const previouslySelectedCollegeIds = localStorage.getItem("colleges");
  // console.log(previouslySelectedCollegeIds)
  const [windowSize, setWindowSize] = useState(0);

  const previouslySelectedColleges = useMemo(
    () =>
      previouslySelectedCollegeIds
        ? previouslySelectedCollegeIds
            .split(",")
            .map((id) => reportTableData.find((college) => college["id"] == id))
        : [],
    [previouslySelectedCollegeIds]
  );
  // console.log("🚀 ~ ReportTable ~ previouslySelectedColleges:", collegeData['GC'])

  const collegesAfterFiltering = useMemo(
    () =>
      data // for now its GC, later keep it as selectable
        .filter(
          (college) =>
            college[`${searchCriteria?.Category} - Cutoff`] >=
              parseFloat(searchCriteria?.MinCutoff) &&
            college[`${searchCriteria?.Category} - Cutoff`] <=
              parseFloat(searchCriteria?.MaxCutoff) &&
            (searchCriteria?.CollegeCode
              ? college["College Code"] == searchCriteria?.CollegeCode
              : true) &&
            (searchCriteria?.BranchName
              ? college["Branch Name"]
                  .replace(/\s+/g, "")
                  .toLowerCase()
                  .includes(searchCriteria?.BranchName)
              : true) &&
            (searchCriteria?.CollegeCategory
              ? college["College Category"] == searchCriteria?.CollegeCategory
              : true)
        )
        .filter((college) =>
          searchCriteria?.District && searchCriteria?.District?.length > 0
            ? searchCriteria?.District == "ALL"
              ? true
              : districtData.find(
                  (dist) =>
                    searchCriteria?.District.includes(dist["District "]) &&
                    dist["COLLEGE CODE"] == college["College Code"]
                )
            : true
        )
        .sort((a, b) =>
          searchCriteria.filterBy == "Cutoff"
            ? b[`${searchCriteria?.Category} - ${searchCriteria.filterBy}`] -
              a[`${searchCriteria?.Category} - ${searchCriteria.filterBy}`]
            : a[`${searchCriteria?.Category} - ${searchCriteria.filterBy}`] -
              b[`${searchCriteria?.Category} - ${searchCriteria.filterBy}`]
        ),
    [searchCriteria]
  );

  const pagination = usePagination({
    total: parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1,
    initialPage: 1,
    siblings: 1,
  });

  useEffect(() => setWindowSize(window.innerWidth), []);

  const [selectedColleges, setSelectedColleges] = useState(
    previouslySelectedColleges ?? []
  );
  // console.log("🚀 ~ ReportTable ~ selectedColleges:", selectedColleges)

  const collegesAfterSlicing = useMemo(
    () =>
      selectedColleges
        .concat(
          collegesAfterFiltering.filter((college) =>
            previouslySelectedCollegeIds
              ? !previouslySelectedCollegeIds.includes(college.id)
              : true
          )
        )
        .slice(
          (pagination.active - 1) * PAGE_SIZE,
          pagination.active * PAGE_SIZE
        ),
    [
      pagination.active,
      collegesAfterFiltering,
      selectedColleges,
      previouslySelectedCollegeIds,
    ]
  );

  useEffect(() => pagination.setPage(1), [searchCriteria]);

  const [bodyRef] = useAutoAnimate({ easing: "ease-in-out", duration: 500 });

  // console.log("🚀 ~ ReportTable ~ collegesAfterSclicing:", collegesAfterSlicing)

  if (!searchCriteria.Category) return <p>Invalid search parameters!</p>;

  return (
    <>
      <p className='ml-2 w-full text-left mt-5 md:mt-2'>
        🔍 <span className='font-medium'>{collegesAfterFiltering.length}</span>{" "}
        college(s) found
      </p>
      <DataTable
        bodyRef={bodyRef}
        highlightOnHover
        height={500}
        styles={{
          table: {
            background: "white",
            border: "1px solid rbga(0, 0, 0, 0.4)",
            padding: "2px",
          },
          header: {
            position: "sticky",
            top: 0,
            background: "white",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          },
        }}
        scrollAreaProps={{ type: "always", h: 500 }}
        // noRecordsIcon={}
        noRecordsText='Could not find any colleges'
        emptyState={<>{""}</>}
        customLoader={<>{""}</>}
        loaderSize={"xs"}
        columns={[
          {
            accessor: "S.No",
            title: "Choice Order",
            render: (record) => {
              let x = selectedColleges.indexOf(record);
              return x == -1 ? "" : x + 1;
            },
            cellsClassName: "font-semibold", // removed sticky and top-0 it works... but header epdi vekradhu
            width: 60,
          },
          { accessor: "College Code", title: "College Code" },
          {
            accessor: "College Name",
            title: "College Name",
            width: windowSize < CUSTOM_BREAKPOINT ? 200 : "auto",
            render: (value) => (
              <>
                {value["College Name"]},
                <br />
                <div className='flex h-fit gap-1 mt-1 flex-wrap'>
                  <p className='px-1.5 cursor-default py-3/4 rounded-full text-xs text-amber-500 bg-amber-50 w-fit h-fit'>
                    {value.autonomous}
                  </p>
                </div>
              </>
            ),
          },
          {
            accessor: "Branch Name",
            title: "Branch Name",
            width: windowSize < CUSTOM_BREAKPOINT ? 150 : "auto",
            render: (value) => (
              <>
                {value["Branch Name"].toUpperCase()}
                <br />
                {value["nba"] != "no" && (
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
              </>
            ),
          },
          {
            accessor: "OC - Vacancy",
            title: "OC Vacancy",
            width: windowSize < CUSTOM_BREAKPOINT ? 100 : "auto",
            render: (value) => {
              const whichRoundToSearch = value[searchCriteria.round];
              return (
                <p
                  className={`${
                    whichRoundToSearch
                      ? !whichRoundToSearch["OC"] ||
                        whichRoundToSearch["OC"] == 0
                        ? "text-red-500"
                        : "text-green-500"
                      : !value["OC - Vacancy"] || value["OC - Vacancy"] == 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {whichRoundToSearch
                    ? whichRoundToSearch["OC"]
                    : value["OC - Vacancy"]}
                </p>
              );
            },
          },
          {
            accessor: `${searchCriteria?.Category} - Vacancy`,
            title: `${searchCriteria?.Category} - Vacancy`,
            width: windowSize < CUSTOM_BREAKPOINT ? 100 : "auto",
            hidden: searchCriteria?.Category == "OC",
            render: (value) => {
              const whichRoundToSearch = value[searchCriteria.round];
              return (
                <p
                  className={`${
                    whichRoundToSearch
                      ? !whichRoundToSearch[`${searchCriteria?.Category}`] ||
                        whichRoundToSearch[`${searchCriteria?.Category}`] == 0
                        ? "text-red-500"
                        : "text-green-500"
                      : !value[`${searchCriteria?.Category} - Vacancy`] ||
                        value[`${searchCriteria?.Category} - Vacancy`] == 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {whichRoundToSearch
                    ? whichRoundToSearch[`${searchCriteria?.Category}`]
                    : value[`${searchCriteria?.Category} - Vacancy`]}
                </p>
              );
            },
          },
          {
            accessor: `${searchCriteria?.Category} - ${searchCriteria?.filterBy}`,
            title: `${searchCriteria?.Category} - ${searchCriteria?.filterBy} (Reference)`,
            width: 100,
          },
        ]}
        records={collegesAfterSlicing}
        isRecordSelectable={(x) => {
          const isRound23 = x[searchCriteria.round];
          if (isRound23) {
            return parseInt(isRound23[searchCriteria.Category]) != 0;
          } else {
            return parseInt(x[`${searchCriteria.Category} - Vacancy`]) != 0;
          }
        }}
        rowStyle={(x) => {
          const isRound23 = x[searchCriteria.round];
          let canFade = false;
          if (isRound23) {
            canFade = parseInt(isRound23[searchCriteria.Category]) == 0;
          } else {
            canFade = parseInt(x[`${searchCriteria.Category} - Vacancy`]) == 0;
          }
          if (canFade)
            return {
              opacity: 0.5,
              pointerEvents: "none",
              // background: ""
            };
        }}
        page={pagination.active}
        totalRecords={collegesAfterFiltering.length}
        recordsPerPage={PAGE_SIZE}
        onPageChange={pagination.setPage}
        selectedRecords={selectedColleges}
        onSelectedRecordsChange={(colleges) =>
          addCollegeToList(colleges, setSelectedColleges)
        }
        selectionTrigger='cell'
        selectionColumnClassName='cursor-pointer'
        selectionCheckboxProps={{ className: "cursor-pointer" }}
        rowClassName={"h-28 max-h-28 mx-1"}
      />
      <div className='w-full flex md:flex-row flex-col md:justify-between mt-16'>
        <p className='ml-2'>
          🔍{" "}
          <span className='font-medium'>{collegesAfterFiltering.length}</span>{" "}
          college(s) found
        </p>
        <p className='ml-2'>
          ✅ <span className='font-medium'>{selectedColleges.length}</span>{" "}
          college(s) selected
        </p>
        {/* <Pagination
          total={parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1}
          value={pagination.active}
          onChange={pagination.setPage}
          className='ml-auto'
        /> */}
      </div>
      <div className='w-full flex'>
        <Button
          label={"Proceed"}
          to='/report/generate'
          className='md:ml-auto w-max bg-mantine-blue px-6 py-2'
        />
      </div>
    </>
  );
};

export default ReportTable;
