'use client'
import Button from "@/components/ui/Button";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
export default function Home() {
  
  return (
    <main className='flex min-h-screen flex-col items-center w-full'>
      {/* Header */}
      <header className='flex w-full items-center justify-between md:px-8 px-5 py-4 md:py-6'>
        {/* Logo here */}
        <h1 className='md:text-3xl text-xl font-medium'>Get Your College</h1>
        {/* Login button */}
        <Button
          label={
            <div className='flex gap-1 items-center group-hover:gap-2 transition-all'>
              <CiLogin />
              <h2>Log In</h2>
            </div>
          }
          asButton
          to='/login'
          className='bg-sky-600 w-fit px-4 py-2 md:px-7 md:py-2'
        />
      </header>

      {/* Hero Section */}
      <div className='flex w-full items-center justify-center flex-col p-4 md:p-14 gap-4'>
        <h1 className='text-4xl md:text-6xl mt-4 font-bold text-center'>
          Your Complete Guide for
        </h1>
        <h1 className='md:text-6xl text-5xl text-center font-bold'>
          <span className='relative text-sky-500'>
            Engineering{" "}
            {/* <span className='text-lg absolute top-0 left-[95%] text-sky-600'>
              (TNEA)
            </span> */}
          </span>
          {/* &nbsp;&nbsp;&nbsp; */}
          <span className='text-4xl'>&</span>
          &nbsp;
          <span className='relative text-red-500'>
            Medical{" "}
            {/* <span className='text-lg absolute top-0 text-sky-600'>(NEET)</span> */}
          </span>{" "}
          <br />
        </h1>
        <h1 className='md:text-6xl text-5xl text-center font-bold'>
          Counselling
        </h1>
        <p className='font-semibold text-xl mt-8 text-center md:leading-normal leading-8'>
          <span className='underline decoration-sky-600 decoration-dotted'>
            Cut-off Marks
          </span>
          {" "}-{" "}
          <span className='underline decoration-sky-600 decoration-dotted'>
            Colleges list
          </span>
          {" "}-{" "}
          <span className='underline decoration-sky-600 decoration-dotted'>
            Course list
          </span>
          {" "}-{" "}
          <span className='underline decoration-sky-600 decoration-dotted'>
            Choice List Preparation
          </span>
          &nbsp; and much more... <br />
        </p>
        <p className='font-normal text-xl text-center'>
          Let's clear all doubts from <span className="font-semibold text-xl text-center">College selection</span> to <span className="font-semibold text-xl text-center">Choice Filling</span> — all in one place
        </p>
        <div className='flex gap-3 md:gap-5 md:mt-4 mt-6 items-center'>
          <Button
            label={
              <div className='flex gap-1 items-center group-hover:gap-2 transition-all'>
                <MdOutlineArrowOutward />
                <h2>Get Started</h2>
              </div>
            }
            className='rounded-sm group w-fit bg-sky-600 px-6 py-3'
            to='/login'
          />
          <Button
            label={
              <div className='flex gap-2 group-hover:gap-3 transition-all items-center'>
                <IoBookOutline className='text-sky-600' />
                <h2 className='text-sky-600'>Learn more</h2>
              </div>
            }
            className='rounded-sm group outline outline-1 outline-sky-500 bg-transparent w-fit px-6 py-3'
            to='#more'
          />
        </div>
      </div>
    </main>
  );
}
