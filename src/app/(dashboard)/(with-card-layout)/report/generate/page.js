"use client";
import ReOrderTable from "@/components/ReOrderTable";
import Button from "@/components/ui/Button";
// import { dummyPreferenceList } from "@/utils/dummy_data";
import { PDFExport } from "@progress/kendo-react-pdf";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import collegeData from "@/utils/collegeData";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

export const dynamic = "force-dynamic";

const Generate = () => {
  const [collegPrefernces, setCollegPrefernces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const pdfComponentRef = useRef();
  const { data } = useSession();

  useEffect(() => {
    const preferredCollegesId = localStorage.getItem("colleges")?.split(",");
    if (preferredCollegesId) {
      const preferredColleges = preferredCollegesId.map((id) =>
        collegeData['GC'].find((college) => college.id == id)
      );
      console.log("🚀 ~ useEffect ~ preferredColleges:", preferredColleges)
      setCollegPrefernces(preferredColleges);
    }
    setSelectedCategory(localStorage.getItem("Cat") ?? "NA");
  }, []);
  // console.log("🚀 ~ Generate ~ preferredColleges:", preferredColleges)

  if (!selectedCategory) return <SkeletonLoader rows={10} />;

  return (
    <>
      <h1 className='font-medium text-2xl'>
        Let&apos;s get your college preferences right
      </h1>
      <h1 className='font-normal text-base'>
        Feel free to re-order according to your preference
      </h1>
      {/* Table for Next Page */}
      {selectedCategory === "NA" ? (
        <div className='flex w-full flex-col justify-center items-center'>
          <Image
            src='/Empty-pana.png'
            width={350}
            height={200}
            quality={95}
            alt='Empty Selection'
          />
          <p className='text-primary/50'>
            No colleges selected! Go back and select colleges in Report Page
          </p>
        </div>
      ) : (
        <>
          <div className='fixed left-full'>
            <PDFExport
              ref={pdfComponentRef}
              fileName={
                (data?.user?.name || "User") +
                " " +
                new Date().toLocaleString() +
                "-" +
                "College Choice Report"
              }
              paperSize={"A4"}
              margin='1cm'
              creator='Get Your College'
            >
              <div className='flex flex-col overflow-x-scroll w-full md:overflow-x-hidden'>
                <div className='flex w-full justify-center items-center flex-col px-4'>
                  <a href='https://getyourcollege.com'>
                    <Image
                      src={"/logo.png"}
                      width={175}
                      alt='Get Your College Logo'
                      height={175}
                    />
                  </a>
                </div>
                <p style={{ fontSize: "10px", marginLeft: "6px", fontWeight: "semibold" }}>Name: {data?.user?.name || 'Student'}</p>
                <p style={{ fontSize: "10px", marginLeft: "6px" }}>Registration No.: </p>
                <div className='flex min-w-fit md:min-w-[unset] justify-around items-center p-2 mx-1 mt-1 md:p-4 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200 reorder-header'>
                  <h2 className='flex-1 font-medium min-w-16 max-w-28'>
                    Choice Order
                  </h2>
                  <h2 className='flex-1 font-medium min-w-20 max-w-36'>
                    College Code
                  </h2>
                  <h2 className='min-w-44 max-w-96 flex-1 font-medium md:m-0 mx-2'>
                    College Name
                  </h2>
                  <h2 className='max-w-36 flex-1 font-medium min-w-32 md:m-0 mx-2'>
                    Branch
                  </h2>
                  {/* <h2 className='to-remove max-w-36 flex-1 font-medium min-w-20'>
                    {selectedCategory} - Cutoff
                  </h2>
                  <h2 className='max-w-14 flex-1 font-medium min-w-12'>
                    Actions
                  </h2> */}
                </div>
                <ReOrderTable
                  collegPrefernces={collegPrefernces}
                  setCollegPrefernces={setCollegPrefernces}
                  withCutoff={false}
                />
              </div>
              <div className='flex gap-1 w-full mt-5 justify-start items-center px-4'>
                <Image src='/yt.png' width={15} height={15} alt='YT' />
                <a
                  href='https://www.youtube.com/c/A2KDK'
                  style={{
                    fontSize: "8px",
                    textDecoration: "underline",
                    color: "blue",
                  }}
                  target='_blank'
                >
                  Official Youtube Channel | Admission & Counselling - Guides,
                  Updates
                </a>
              </div>
            </PDFExport>
          </div>
          <Link href='/report' className="text-blue-600 font-medium flex gap-2 items-center text-base">
            <BsChevronLeft size={14} /> Edit Colleges List
          </Link>
          <div className='flex flex-col overflow-x-scroll w-full md:overflow-x-hidden'>
            <div className='flex min-w-fit md:min-w-[unset] justify-around items-center p-2 mx-1 mt-1 md:p-4 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200 reorder-header'>
              <h2 className='flex-1 font-medium min-w-16 max-w-28'>
                Choice Order
              </h2>
              <h2 className='flex-1 font-medium min-w-20 max-w-36'>
                College Code
              </h2>
              <h2 className='min-w-44 max-w-96 flex-1 font-medium md:m-0 mx-2'>
                College Name
              </h2>
              <h2 className='max-w-36 flex-1 font-medium min-w-32 md:m-0 mx-2'>
                Branch
              </h2>
              <h2 className='to-remove max-w-36 flex-1 font-medium min-w-20'>
                {selectedCategory} - Cutoff
              </h2>
              <h2 className='max-w-16 flex-1 font-medium min-w-12'>Actions</h2>
            </div>
            <ReOrderTable
              collegPrefernces={collegPrefernces}
              setCollegPrefernces={setCollegPrefernces}
            />
          </div>
          <Button
            label={
              <span className='flex gap-2 items-center justify-center'>
                <MdOutlineFileDownload />
                Download Report
              </span>
            }
            className='w-fit px-4 bg-mantine-blue ml-auto py-2'
            asButton
            onClick={() => {
              console.log("Saving PDF?", pdfComponentRef.current);
              pdfComponentRef.current.save();
            }}
          />
        </>
      )}
    </>
  );
};

export default Generate;
