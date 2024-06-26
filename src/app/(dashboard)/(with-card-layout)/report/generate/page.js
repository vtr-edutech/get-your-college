"use client";
import ReOrderTable from "@/components/ReOrderTable";
import Button from "@/components/ui/Button";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import collegeData from "@/utils/collegeData";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import { useUserInfo } from "@/utils/hooks";
import { toast } from "react-toastify";
import axios from "axios";
export const dynamic = "force-dynamic";

const Generate = () => {
  const [collegPrefernces, setCollegPrefernces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [downloading, setDownloading] = useState(false);
  const { loading, userInfo } = useUserInfo()

  useEffect(() => {
    const preferredCollegesId = localStorage.getItem("colleges")?.split(",");
    if (preferredCollegesId) {
      const preferredColleges = preferredCollegesId.map((id) =>
        collegeData['GC'].find((college) => college.id == id)
      );
      
      setCollegPrefernces(preferredColleges);
    }
    setSelectedCategory(localStorage.getItem("Cat") ?? "NA");
  }, []);
  
  const handlePDF = async () => {
    try {
      setDownloading(true);
      const response = await axios({
        url: "/api/generate-pdf",
        method: "POST",
        responseType: "blob",
        data: {
          name: userInfo?.firstName
            ? userInfo.firstName + " " + (userInfo.lastName ?? "")
            : "Student",
          registerNo: userInfo?.registerNo ?? '',
          colleges: collegPrefernces,
          type: "choice",
        },
      });
      
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        userInfo?.firstName
          ? userInfo.firstName + " " + (userInfo.lastName ?? "")
          : "Student"
      } - Choice List.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log("🚀 ~ handlePDF ~ error:", error);
      toast.error(
        error.response?.data?.error ??
          error.message ??
          "Unexpected error in generating PDF!"
      );
    } finally {
      setDownloading(false);
    }
  };
  
  useEffect(() => {
    if (
      !loading &&
      (!userInfo.firstName || !userInfo.registerNo)
    ) {
      toast.error("Please enter details in settings to continue");
    }
  }, [userInfo, loading]);

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
      {(selectedCategory === "NA") || (collegPrefernces.length < 1) ? (
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
            className={`${downloading? 'opacity-60 pointer-events-none': ''} w-fit px-4 bg-mantine-blue ml-auto py-2`}
            asButton
            onClick={handlePDF}
          />
        </>
      )}
    </>
  );
};

export default Generate;
