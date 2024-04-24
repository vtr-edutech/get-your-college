'use client'
import React, { useRef, useState } from "react";
import Button from "./ui/Button";

function CutoffCalculator() {
  const [cutoff, setCutoff] = useState(0);
  const pRef = useRef();
  const cRef = useRef();
  const mRef = useRef();
  const cutoffRef = useRef();

  const handleCutoff = () => {
    setCutoff(
      (
        parseFloat(pRef.current.value ?? 0) / 2 +
        parseFloat(cRef.current.value ?? 0) / 2 +
        parseFloat(mRef.current.value ?? 0)
      ).toFixed(2)
    );
  }

  return (
    <>
      <div className='md:flex md:gap-2 md:h-min md:flex-col flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h2>Physics</h2>
          <input
            type='number'
            className='bg-card p-2 md:w-40 h-min max-w-44  rounded-md focus:outline-1 focus:outline-gray-200'
            name='physics'
            id='physics'
            placeholder='Max 100'
            ref={pRef}
            onInput={(e) => {
              const phyMarks = e.currentTarget.value;
              if (phyMarks.length == 2 && parseFloat(phyMarks) < 100) {
                cRef.current.focus();
              }
            }}
          />
        </div>
        <div className='flex items-center justify-between'>
          <h2>Chemistry</h2>
          <input
            type='number'
            className='bg-card p-2 md:w-40 h-min max-w-44 rounded-md focus:outline-1 focus:outline-gray-200'
            name='chemistry'
            id='chemistry'
            ref={cRef}
            onInput={(e) => {
              const chemMarks = e.currentTarget.value;
              if (chemMarks.length == 2 && parseFloat(chemMarks) < 100) {
                mRef.current.focus();
              }
            }}
            placeholder='Max 100'
          />
        </div>
        <div className='flex items-center justify-between'>
          <h2>Math</h2>
          <input
            ref={mRef}
            type='number'
            className='bg-card p-2 md:w-40 h-min max-w-44 rounded-md focus:outline-1 focus:outline-gray-200'
            name='math'
            id='math'
            onInput={(e) => {
              const mathMarks = e.currentTarget.value;
              if (mathMarks.length == 2 && parseFloat(mathMarks) < 100) {
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
            className='bg-card p-2 md:w-40 h-min max-w-44 rounded-md focus:outline-1 focus:outline-gray-200'
            name='cutoff'
            id='cutoff'
            value={cutoff}
            placeholder='Max 100'
          />
        </div>
        <Button
          label={"Calculate"}
          className='py-2 col-span-3'
          asButton
          onClick={handleCutoff}
        />
      </div>
    </>
  );
}

export default CutoffCalculator;
