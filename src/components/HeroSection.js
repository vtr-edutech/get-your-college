"use client";

import { IoBookOutline } from "react-icons/io5";
import Button from "./ui/Button";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Tooltip } from "@mantine/core";

export default function HeroSection() {
    return (
      <div className='flex w-full min-h-[90vh] md:min-h-[calc(95vh-8rem)] md:mt-0 mt-5 items-center md:justify-center flex-col p-4 md:p-14 gap-6 md:gap-4'>
        <h1 className='text-4xl md:text-6xl font-bold text-center'>
          Your Complete Guidance for
        </h1>

        <div className='flex md:gap-3 flex-col'>
          <h1
            className='md:text-6xl md:leading-[inherit] leading-normal text-5xl text-center font-bold'
          >
            <span className='relative leading-6 z-10 bg-[url("/drawsvg.svg")]  bg-[50%_50%_0rem] bg-[length:100%] bg-clip-padding bg-blend-lighten'>
              Engineering {/* <HighlightYellow /> */}
              {/* <span className='text-lg absolute top-0 left-[95%] text-sky-600'>
              (TNEA)
              </span> 
              */}
            </span>
            {/* &nbsp;&nbsp;&nbsp; */}
            <span className='text-5xl'>&</span>
            &nbsp;
            <span className='relative md:my-0 my-4 bg-[url("/new.svg")] px-2 bg-no-repeat bg-[center_center] bg-[length:130%] bg-blend-lighten'>
              Medical{" "}
              {/* <span className='text-lg absolute top-0 text-sky-600'>(NEET)</span> */}
            </span>{" "}
            <br />
          </h1>
          <h1 className='md:text-6xl text-5xl text-center font-bold'>
            Counselling
          </h1>
        </div>

        <p className='font-semibold text-xl mt-8 text-center md:leading-normal leading-8'>
          <Tooltip
            withArrow
            label={
              "Cut-off Marks calculation and colleges recommendation based on cutoff"
            }
            styles={{
              tooltip: {
                fontSize: 12,
              },
            }}
          >
            <span className='underline decoration-sky-600 decoration-dotted'>
              Cut-off Marks
            </span>
          </Tooltip>{" "}
          -{" "}
          <Tooltip
            withArrow
            label={
              "Extensive list of information for all colleges presented to you"
            }
            styles={{
              tooltip: {
                fontSize: 12,
              },
            }}
          >
            <span className='underline decoration-sky-600 decoration-dotted'>
              Colleges list
            </span>
          </Tooltip>{" "}
          -{" "}
          <Tooltip
            withArrow
            label={"Detailed course list"}
            styles={{
              tooltip: {
                fontSize: 12,
              },
            }}
          >
            <span className='underline decoration-sky-600 decoration-dotted'>
              Course list
            </span>
          </Tooltip>{" "}
          -{" "}
          <Tooltip
            withArrow
            label={"Easy to use choice list preparation"}
            styles={{
              tooltip: {
                fontSize: 12,
              },
            }}
          >
            <span className='underline decoration-sky-600 decoration-dotted'>
              Choice List Preparation
            </span>
          </Tooltip>
          &nbsp; and much more... <br />
        </p>

        <p className='font-normal text-xl text-center'>
          Let&apos;s clear all doubts from{" "}
          <span className='font-semibold text-xl text-center'>
            College selection
          </span>{" "}
          to{" "}
          <span className='font-semibold text-xl text-center'>
            Choice Filling
          </span>{" "}
          — all in one place
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
    );
}