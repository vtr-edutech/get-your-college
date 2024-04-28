'use client'
import React, { useRef, useState } from "react";
import Button from "./ui/Button";
import { useUserInfo } from "@/utils/hooks";
import { Skeleton } from "@mantine/core";

function CutoffCalculator() {
  const [cutoff, setCutoff] = useState(0);
  const { loading, userInfo } = useUserInfo();

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
      answer.split(".")[1] == "00"? answer.split(".")[0]: parseFloat(answer).toFixed(1)
    );
  }

  return (
    <>
      <div className='md:flex md:gap-3 md:h-min md:flex-col flex flex-col gap-2 md:py-2'>
        <div className='flex items-center justify-between'>
          <h2>12th Register No.</h2>
          <Skeleton visible={loading}  width={"fit-content"} radius="md">
            <input
              type='text'
              className='bg-card p-2 md:w-40 h-min max-w-44  rounded-md outline outline-1 outline-gray-200 focus:outline-1 focus:outline-sky-500/60'
              name='regNo'
              id='regNo'
              placeholder='XXXXXXXXX'
              value={userInfo?.registerNo ?? ''}
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
            onInput={(e) => {
              const phyMarks = e.currentTarget.value;
              // if (regNo.length != regNoLength) {
              //   toast.error("Please enter valid 12th registration marks");
              //   regRef.current.focus();
              //   return;
              // }
              if (phyMarks.length == 2) {
                cRef.current.focus();
                handleCutoff();
              }
            }}
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
            onInput={(e) => {
              const chemMarks = e.currentTarget.value;
              // if (regNo.length != regNoLength) {
              //   toast.error("Please enter valid 12th registration marks");
              //   regRef.current.focus();
              //   return;
              // }
              if (chemMarks.length == 2) {
                mRef.current.focus();
                handleCutoff();
              }
            }}
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
            onInput={(e) => {
              const mathMarks = e.currentTarget.value;
              //  if (regNo.length != regNoLength) {
              //     toast.error("Please enter valid 12th registration marks");
              //     regRef.current.focus();
              //     return;
              //   }
              if (mathMarks.length == 2) {
                handleCutoff();
              }
            }}
            placeholder='Max 100'
          />
        </div>
        <div className='flex items-center justify-between'>
          <h2>Cutoff</h2>
          <input
            readOnly
            ref={cutoffRef}
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
      </div>
    </>
  );
}

export default CutoffCalculator;
