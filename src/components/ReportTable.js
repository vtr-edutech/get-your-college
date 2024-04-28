import collegeData from "@/utils/collegeData";
import { usePagination } from "@mantine/hooks";
import { DataTable } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import Button from "./ui/Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { reportTableData } from "@/utils/collegeChoiceListData";

const PAGE_SIZE = 25;

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
  const previouslySelectedCollegeIds = localStorage.getItem("colleges");
  console.log(previouslySelectedCollegeIds)
  const [windowSize, setWindowSize] = useState(0);
  
  const previouslySelectedColleges = useMemo(
    () =>
      previouslySelectedCollegeIds ?
      previouslySelectedCollegeIds
        .split(",")
        .map((id) => collegeData['GC'].find((college) => college.id == id)): [],
    [previouslySelectedCollegeIds]
  ); 
  // console.log("🚀 ~ ReportTable ~ previouslySelectedColleges:", collegeData['GC'])

  const collegesAfterFiltering = useMemo(
    () =>
      reportTableData // for now its GC, later keep it as selectable
        .filter(
          (college) =>
            (college[`${searchCriteria?.Category} - Cutoff`] >=
              parseFloat(searchCriteria.MinCutoff) &&
            college[`${searchCriteria?.Category} - Cutoff`] <=
              parseFloat(searchCriteria.MaxCutoff)) && (
                searchCriteria.searchKey && searchCriteria.searchKey.trim()
                  ? (college["College Name"]
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(
                        searchCriteria.searchKey.toLowerCase().replace(/\s+/g, "")
                      ) ||
                    college["Branch Name"]
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(
                        searchCriteria.searchKey.toLowerCase().replace(/\s+/g, "")
                      )
                    )
                  : true
              )
        ),
    [searchCriteria]
  );

  
  const pagination = usePagination({
    total: parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1,
    initialPage: 1,
    siblings: 1,
  });
  
  useEffect(() => pagination.setPage(1), [searchCriteria.searchKey])

  useEffect(() => setWindowSize(window.innerWidth), [])
  
  const [selectedColleges, setSelectedColleges] = useState(
    previouslySelectedColleges ?? []
  );
  console.log("🚀 ~ ReportTable ~ selectedColleges:", selectedColleges)

  const collegesAfterSlicing = useMemo(
    () =>
      selectedColleges.concat(
        collegesAfterFiltering
          .filter((college) =>
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

  const [bodyRef] = useAutoAnimate();

  // console.log("🚀 ~ ReportTable ~ selectedColleges:", typeof selectedColleges)

  if (!searchCriteria.Category) return <p>Invalid search parameters!</p>;

  return (
    <>
      <DataTable
        bodyRef={bodyRef}
        highlightOnHover
        // noRecordsIcon={}
        noRecordsText='Could not find any colleges'
        emptyState={<>{""}</>}
        minHeight={280}
        mah={"450px"}
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
            cellsClassName: "font-semibold",
            width: 100,
          },
          { accessor: "College Code", title: "College Code" },
          {
            accessor: "College Name",
            title: "College Name",
            width: windowSize < 768 ? 200 : "auto",
          },
          {
            accessor: "Branch Name",
            title: "Branch Name",
            width: windowSize < 768 ? 150 : "auto",
            render: (value) => value["Branch Name"].toUpperCase(),
          },
          {
            accessor: "OC - Vacancy",
            title: "OC Vacany",
            width: windowSize < 768 ? 150 : "auto",
            // render: (value) => value['Branch Name'].toUpperCase()
          },
          {
            accessor: `${searchCriteria?.Category} - Vacancy`,
            title: `${searchCriteria?.Category} - Vacancy`,
            width: windowSize < 768 ? 150 : "auto",
            // render: (value) => value['Branch Name'].toUpperCase()
          },
          {
            accessor: `${searchCriteria?.Category} - Cutoff`,
            title: `${searchCriteria?.Category} - Cutoff (Reference)`,
          },
        ]}
        records={collegesAfterSlicing}
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
      <div className='w-full flex md:flex-row flex-col md:justify-between'>
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
          className='md:ml-auto w-max px-6 py-2'
        />
      </div>
    </>
  );
};

export default ReportTable;
