'use client'
import React, { useRef, useState } from "react";
import Button from "./ui/Button";

function CutoffCalculator() {
  const [cutoff, setCutoff] = useState();
  const pRef = useRef();
  const cRef = useRef();
  const mRef = useRef();
  return (
    <>
      <div className='flex gap-2 h-min'>
        <input
          type='number'
          className='bg-card p-2 md:w-40 h-min max-w-44  rounded-md focus:outline-1 focus:outline-gray-200'
          name='physics'
          id='physics'
          placeholder='Physics'
          ref={pRef}
        />
        <input
          type='number'
          className='bg-card p-2 md:w-40 h-min max-w-44 rounded-md focus:outline-1 focus:outline-gray-200'
          name='chemistry'
          id='chemistry'
          ref={cRef}
          placeholder='Chemistry'
        />
        <input
            ref={mRef}
          type='number'
          className='bg-card p-2 md:w-40 h-min max-w-44 rounded-md focus:outline-1 focus:outline-gray-200'
          name='math'
          id='math'
          placeholder='Math'
        />
        <Button
          label={"Calculate"}
          className='py-1'
          asButton
          onClick={() => {
            setCutoff(((parseFloat(pRef.current.value)/2) + (parseFloat(cRef.current.value)/2) + parseFloat(mRef.current.value)).toFixed(2))
          }}
        />
      </div>
      {cutoff && <p>Your cutoff is {cutoff} / 200</p>}
    </>
  );
}

export default CutoffCalculator;
