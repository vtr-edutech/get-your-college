import collegeData from "@/utils/collegeData";
import { usePagination } from "@mantine/hooks";
import { DataTable } from "mantine-datatable";
import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_SIZE = 10;

const addCollegeToList = (colleges, setSelectedColleges) => {
  localStorage.setItem(
    "colleges",
    colleges.map((college) => college.id)
  );
  setSelectedColleges(colleges);
};

const ReportTable = ({ searchCriteria }) => {
  const previouslySelectedCollegeIds = localStorage.getItem("colleges");
  const [windowSize, setWindowSize] = useState(0);
  
  const previouslySelectedColleges = useMemo(
    () =>
      previouslySelectedCollegeIds &&
      previouslySelectedCollegeIds
        .split(",")
        .map((id) => collegeData.find((college) => college.id == id)),
    [previouslySelectedCollegeIds]
  ); 

  const collegesAfterFiltering = useMemo(
    () =>
      collegeData['GC'] // for now its GC, later keep it as selectable
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

  const collegesAfterSlicing = useMemo(
    () =>
      collegesAfterFiltering.slice(
        (pagination.active - 1) * PAGE_SIZE,
        pagination.active * PAGE_SIZE
      ),
    [pagination.active, collegesAfterFiltering]
  );

  const [selectedColleges, setSelectedColleges] = useState(
    previouslySelectedColleges ?? []
  );

  if (!searchCriteria.Category) return <p>Invalid search parameters!</p>;

  return (
    <>
      <DataTable
        highlightOnHover
        noRecordsIcon={<>{""}</>}
        noRecordsText=''
        emptyState={<>{""}</>}
        minHeight={280}
        mah={"450px"}
        customLoader={<>{""}</>}
        loaderSize={"xs"}
        columns={[
          {
            accessor: "S.No",
            title: "S.No",
            render: (record) => collegesAfterSlicing.indexOf(record) + 1,
          },
          { accessor: "College Code", title: "College Code" },
          {
            accessor: "College Name",
            title: "College Name",
            width: windowSize < 768 ? 200 : "auto",
          },
          { accessor: "Branch Code", title: "Branch Code" },
          {
            accessor: "Branch Name",
            title: "Branch Name",
            width: windowSize < 768 ? 150 : "auto",
          },
          {
            accessor: `${searchCriteria?.Category} - Cutoff`,
            title: `${searchCriteria?.Category} - Cutoff`,
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
    </>
  );
};

export default ReportTable;
