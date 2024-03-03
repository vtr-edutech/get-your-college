"use client";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/ui/Button";
import React, { useState } from "react";

const Register = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <AuthCard gap={5}>
      <h2 className='font-medium text-xl text-black/90'>
        Tell us about yourself...
      </h2>
      <div className='flex flex-col gap-1'>
        <p className='font-light text-xs'>Name</p>
        <input
          type='text'
          className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='font-light text-xs'>E-mail</p>
        <input
          type='text'
          className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='font-light text-xs'>Address</p>
        <input
          type='text'
          className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
        />
      </div>
      <div className='flex gap-2'>
        <input id='agree' type='checkbox' className='checked:bg-fill-black' onInput={() => setIsChecked(!isChecked)} />
        <label htmlFor='agree' className='font-normal text-sm'>
          I agree to service terms and conditions
        </label>
      </div>
      <Button label={"Confirm Details"} className={'opacity-20'} isDisabled={!isChecked} />
    </AuthCard>
  );
};

export default Register;
