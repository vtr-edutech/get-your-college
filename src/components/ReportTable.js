import collegeData from "@/utils/collegeData";
import { usePagination } from "@mantine/hooks";
import { DataTable } from "mantine-datatable";
import { useMemo, useState } from "react";

const PAGE_SIZE = 10;

const addCollegeToList = (colleges, setSelectedColleges) => {
    console.log("🚀 ~ addCollegeToList ~ colleges:", colleges)
    localStorage.setItem('colleges', colleges.map(college => college.id))
    setSelectedColleges(colleges)
}

const ReportTable = ({ searchCriteria }) => {
  
  const collegesAfterFiltering = useMemo(() => collegeData.filter((college) => college[`${searchCriteria?.Category} - Cutoff`] >= parseFloat(searchCriteria.MinCutoff) && college[`${searchCriteria?.Category} - Cutoff`] <= parseFloat(searchCriteria.MaxCutoff)), [searchCriteria]);
  
  const pagination = usePagination({
    total: parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1,
    initialPage: 1,
    siblings: 1,
  });
//   console.log("🚀 ~ ReportTable ~ pagination:", pagination)

  const collegesAfterSlicing = useMemo(() =>
    collegesAfterFiltering.slice(
      (pagination.active - 1) * PAGE_SIZE,
      pagination.active * PAGE_SIZE
    ),
    [pagination.active, collegesAfterFiltering]
  );

  const [selectedColleges, setSelectedColleges] = useState([]);

  if (!searchCriteria.Category) return <p>Invalid search parameters!</p>;

  return (
    <>
      <DataTable
        highlightOnHover
        noRecordsIcon={<>{""}</>}
        noRecordsText=''
        emptyState={<>{""}</>}
        minHeight={"400px"}
        mah={'450px'}
        customLoader={<>{""}</>}
        loaderSize={"xs"}
        className='mt-6'
        columns={[
          {
            accessor: "S.No",
            title: "S.No",
            render: (record) => collegesAfterSlicing.indexOf(record) + 1,
          },
          { accessor: "College Code", title: "College Code" },
          { accessor: "College Name", title: "College Name" },
          { accessor: "Branch Code", title: "Branch Code" },
          { accessor: "Branch Name", title: "Branch Name" },
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
        onSelectedRecordsChange={(colleges) => addCollegeToList(colleges, setSelectedColleges)}
        selectionTrigger="cell"
        selectionColumnClassName="cursor-pointer"
        selectionCheckboxProps={{ className: 'cursor-pointer' }}
      />
      {/* <div className='w-full self-end flex'>
        <Pagination
          total={parseInt(collegesAfterFiltering.length / PAGE_SIZE) + 1}
          value={pagination.active}
          onChange={pagination.setPage}
          className='ml-auto'
        />
      </div> */}
    </>
  );
};

export default ReportTable;
