"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { useUserInfo } from "@/utils/hooks";
import { Skeleton } from "@mantine/core";
import { toast } from "react-toastify";
import { GrDocumentDownload } from "react-icons/gr";
import axios from "axios";

function CutoffCalculator() {
  const [cutoff, setCutoff] = useState(0);
  const { loading, userInfo } = useUserInfo();
  const [downloading, setDownloading] = useState(false)

  const pRef = useRef();
  const cRef = useRef();
  const mRef = useRef();
  const cutoffRef = useRef();

  const handleCutoff = () => {
    const answer = (
      parseFloat(pRef.current.value ?? 0) / 2 +
      parseFloat(cRef.current.value ?? 0) / 2 +
      parseFloat(mRef.current.value ?? 0)
    ).toFixed(2);
    setCutoff(
      answer.split(".")[1] == "00"
        ? answer.split(".")[0]
        : parseFloat(answer).toFixed(1)
    );
  };

  const handlePDF = async () => {
    try {
      if (
        !parseFloat(pRef.current.value) ||
        pRef.current.value == 0 ||
        !parseFloat(cRef.current.value) ||
        cRef.current.value == 0 ||
        !parseFloat(mRef.current.value) ||
        mRef.current.value == 0 ||
        cutoff == 0
      ) {
        toast.error("Please check your subject marks");
        return;
      } 
      setDownloading(true);
      const response = await axios({
        url: "/api/generate-pdf",
        method: "POST",
        responseType: "blob",
        data: {
          name: userInfo?.firstName
            ? userInfo.firstName + " " + (userInfo.lastName ?? "")
            : "Student",
          registerNo: userInfo?.registerNo ?? "",
          physics: parseFloat(pRef.current.value ?? 0),
          chemistry: parseFloat(cRef.current.value ?? 0),
          maths: parseFloat(mRef.current.value ?? 0),
          cutoff: cutoff,
          type: "cutoff",
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
      } - Cutoff Calculation.pdf`;
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
      setDownloading(false)
    }
  };

  const handleMarkEntry = (e, inputRef, subjName, nextFocusRef) => {
    const marks = e.currentTarget.value;
    if (parseFloat(marks) < 0) {
      toast.error(`Set ${subjName} cutoff greater than 0`);
      e.currentTarget.value = "";
      return;
    }
    if (marks.length == 3 && parseFloat(marks) != 100) {
      toast.error(`Set ${subjName} cutoff less than or equal to 100`);
      e.currentTarget.value = "";
      return;
    }
    if (marks.length == 2) {
      nextFocusRef.current.focus();
    }
    if (parseFloat(marks) > 100) {
      e.currentTarget.value = "";
      toast.error("Invalid marks!");
      return;
    }
    handleCutoff();
  };

  useEffect(() => {
    if (
      !loading &&
      (!userInfo.firstName || !userInfo.registerNo)
    ) {
      toast.error("Please enter details in settings to continue");
    }
  }, [userInfo, loading]);

  return (
    <>
      {/* For Display */}
      <div className='md:flex md:gap-3 md:h-min md:flex-col flex flex-col gap-2 md:py-2'>
        <div className='flex items-center justify-between'>
          <h2>Name:</h2>
          <Skeleton visible={loading} width={"fit-content"} radius='md'>
            <input
              type='text'
              className='bg-card p-2 md:w-40 h-min max-w-44  rounded-md outline outline-1 outline-gray-200 focus:outline-1 focus:outline-sky-500/60'
              name='name'
              id='name'
              placeholder='Your Name'
              value={userInfo?.firstName ?? ""}
              disabled={!loading}
              // onInput={(e) => {
              //   if (/^[0-9]{1,10}$/.test(e.currentTarget.value)) {
              //     if (e.currentTarget.value.length == regNoLength) {
              //       pRef.current.focus();
              //       // make api call to save reg no.
              //     }
              //     setRegNo(e.currentTarget.value);
              //   } else {
              //     e.currentTarget.value = '';
              //   }
              // }}
            />
          </Skeleton>
        </div>
        <div className='flex items-center justify-between'>
          <h2>12th Register No.</h2>
          <Skeleton visible={loading} width={"fit-content"} radius='md'>
            <input
              type='text'
              className='bg-card p-2 md:w-40 h-min max-w-44  rounded-md outline outline-1 outline-gray-200 focus:outline-1 focus:outline-sky-500/60'
              name='regNo'
              id='regNo'
              placeholder='XXXXXXXXX'
              value={userInfo?.registerNo ?? ""}
              disabled={!loading}
              // onInput={(e) => {
              //   if (/^[0-9]{1,10}$/.test(e.currentTarget.value)) {
              //     if (e.currentTarget.value.length == regNoLength) {
              //       pRef.current.focus();
              //       // make api call to save reg no.
              //     }
              //     setRegNo(e.currentTarget.value);
              //   } else {
              //     e.currentTarget.value = '';
              //   }
              // }}
            />
          </Skeleton>
        </div>
        <div className='flex items-center justify-between'>
          <h2>Physics</h2>
          <input
            type='number'
            className='bg-card p-2 md:w-40 h-min max-w-44  rounded-md outline outline-1 outline-gray-200 focus:outline-1 focus:outline-sky-500/60'
            name='physics'
            id='physics'
            placeholder='Max 100'
            ref={pRef}
            onInput={(e) => handleMarkEntry(e, pRef, "Physics", cRef)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <h2>Chemistry</h2>
          <input
            type='number'
            className='bg-card p-2 md:w-40 h-min max-w-44 rounded-md outline outline-1 outline-gray-200 focus:outline-1 focus:outline-sky-500/60'
            name='chemistry'
            id='chemistry'
            ref={cRef}
            onInput={(e) => handleMarkEntry(e, cRef, "Chemistry", mRef)}
            placeholder='Max 100'
          />
        </div>
        <div className='flex items-center justify-between'>
          <h2>Maths</h2>
          <input
            ref={mRef}
            type='number'
            className='bg-card p-2 md:w-40 h-min max-w-44 rounded-md outline outline-1 outline-gray-200 focus:outline-1 focus:outline-sky-500/60'
            name='maths'
            id='maths'
            onInput={(e) => handleMarkEntry(e, mRef, "Math", cutoffRef)}
            placeholder='Max 100'
          />
        </div>
        <div className='flex items-center justify-between'>
          <h2>Cutoff</h2>
          <input
            readOnly
            ref={cutoffRef}
            disabled
            type='number'
            className='bg-card p-2 md:w-40 h-min max-w-44 rounded-md outline outline-sky-500/60'
            name='cutoff'
            id='cutoff'
            value={cutoff}
          />
        </div>
        <Button
          label={"Calculate"}
          className='py-2 col-span-3 bg-mantine-blue'
          asButton
          onClick={handleCutoff}
        />
        <Button
          label={
            <div className='flex items-center gap-2 justify-center'>
              <GrDocumentDownload />
              Download Report
            </div>
          }
          className={`py-2 col-span-3 bg-mantine-blue ${downloading? 'opacity-60 pointer-events-none': ''}`}
          asButton
          onClick={handlePDF}
        />
      </div>
    </>
  );
}

export default CutoffCalculator;
