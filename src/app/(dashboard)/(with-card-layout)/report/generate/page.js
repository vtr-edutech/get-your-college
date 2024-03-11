"use client";
import ReOrderTable from "@/components/ReOrderTable";
import Button from "@/components/ui/Button";
import { dummyPreferenceList } from "@/utils/dummy_data";
import { PDFExport } from "@progress/kendo-react-pdf";
import React, { useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";

const Generate = () => {
  const [collegPrefernces, setCollegPrefernces] = useState(dummyPreferenceList);
  const pdfComponentRef = useRef();

  return (
    <>
      <h1 className='font-medium text-2xl'>
        Let&apos;s get your college preferences right
      </h1>
      <h1 className='font-normal text-base'>
        Feel free to re-order according to your preference
      </h1>
      {/* Table for Next Page */}
      <PDFExport
        ref={pdfComponentRef}
        fileName='what'
        paperSize={"A4"}
        margin='1cm'
      >
        <div className='flex justify-around items-center p-4 rounded-se-lg rounded-ss-lg outline outline-1 outline-gray-200 reorder-header'>
          <h2 className='flex-1 font-medium max-w-28'>S.No.</h2>
          <h2 className='flex-1 font-medium max-w-36'>College Code</h2>
          <h2 className='min-w-44 max-w-96 flex-1 font-medium'>College Name</h2>
          <h2 className='max-w-36 flex-1 font-medium'>Department Code</h2>
          <h2 className='max-w-36 flex-1 font-medium'>BC Cutoff</h2>
        </div>
        <ReOrderTable
          collegPrefernces={collegPrefernces}
          setCollegPrefernces={setCollegPrefernces}
        />
      </PDFExport>
      <Button
        label={
          <span className='flex gap-2 items-center justify-center'>
            <MdOutlineFileDownload />
            Download Report
          </span>
        }
        className='w-fit px-4 ml-auto py-2'
        asButton
        onClick={() => pdfComponentRef.current.save()}
      />
    </>
  );
};

export default Generate;
