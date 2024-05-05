"use client";

import { MdOutlineArrowOutward } from "react-icons/md";
import Button from "./ui/Button";
import { useEffect } from "react";
import Aos from "aos";

export default function WhatAreYourWaitingFor() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className='flex p-8 md:h-[unset] h-[50vh] w-[90%] md:w-[80%] rounded-lg items-center justify-center flex-col gap-7 bg-card my-12'>
      <p className='text-base' data-aos='fade-up' data-aos-duration='500'>
        What are you waiting for?
      </p>
      <h1
        className='md:text-4xl text-3xl font-semibold text-balance text-center'
        data-aos='fade-up'
        data-aos-delay='500'
        data-aos-duration='500'
      >
        Kickstart your career with <br /> the best college for you!
      </h1>
      <Button
        label={
          <div className='flex gap-1 items-center group-hover:gap-2 transition-all'>
            <MdOutlineArrowOutward />
            <h2>Let&apos;s Get Started</h2>
          </div>
        }
        className='rounded-sm group w-fit bg-sky-600 px-6 py-3 mt-8'
        to='/login'
        data-aos='fade-in'
        data-aos-delay='800'
        data-aos-offset='-100'
        data-aos-duration='600'
      />
    </div>
  );
}
