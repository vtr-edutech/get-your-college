import Button from "@/components/ui/Button";
import { CiLogin } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import WhyGYC from "@/components/WhySection";
import SixFeatures from "@/components/SixFeatures";
import "aos/dist/aos.css";
import HeroSection from "@/components/HeroSection";
import WhatAreYourWaitingFor from "@/components/WhatAreYouWaitingFor";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center w-full bg-[url("/bg.webp")] md:bg-[length:80%] bg-fixed'>
      {/* Header */}
      <header className='flex w-full items-center justify-between md:px-8 px-5 py-4 md:py-6'>
        {/* Logo here */}
        {/* <Image
          src={'/logo_new.png'}
          width={125}
          height={125}
          quality={100}
          alt="Get Your College logo"
        /> */}
        <div className='flex gap-10 md:justify-start justify-center items-center md:gap-6'>
          <Image
            src={"/logo.png"}
            width={45}
            height={45}
            quality={100}
            className='md:w-[unset] md:h-[unset] w-[15%] h-full'
            alt='Get Your College logo'
          />
          <h1 className='md:text-2xl text-lg text-center flex flex-col font-semibold'>
            Get Your College
            <span className='font-normal text-sm md:text-base'>
              Quantum shift to your career
            </span>
          </h1>
        </div>
        {/* Login button */}
        <Button
          label={
            <div className='flex gap-1 px-0 items-center group-hover:gap-2 transition-all'>
              <CiLogin />
              <h2>Log In</h2>
            </div>
          }
          to='/login'
          className='bg-mantine-blue w-fit hidden md:block px-4 py-2 md:px-7 md:py-2'
        />
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Why Get your college? */}
      <SixFeatures />

      {/* Screenshots section */}
      <WhyGYC />

      {/* Meet him section */}

      {/* What are you waiting for? */}
      <WhatAreYourWaitingFor />

      {/* Footer */}
      <div className='bg-background/70 w-full mt-6 px-3 gap-12 justify-between items-start md:px-16 py-12 md:py-10 flex md:flex-row flex-col'>
        <div className='grid place-items-center mt-4 h-full w-full'>
          <Image
            src={"/logo_new.png"}
            width={180}
            height={180}
            quality={100}
            alt='Get Your College logo'
          />
        </div>

        <div className='flex flex-col justify-center gap-4 md:gap-8 mt-4 md:p-0 p-3 md:w-full'>
          <h1 className='text-2xl font-semibold'>Get Your College</h1>
          <div className='grid grid-cols-2 gap-x-1 md:gap-2'>
            <Link href={"/about"} className='hover:underline'>
              About us ›
            </Link>
            <Link href={"/contact-us"} className='hover:underline'>
              Contact us ›
            </Link>
            <Link href={"/privacy-policy"} className='hover:underline'>
              Privacy Policy ›
            </Link>
            <Link href={"/terms"} className='hover:underline'>
              Terms and Conditions›
            </Link>
          </div>
        </div>

        <div className='map grid w-full place-items-center md:max-w-[40%]'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5331177025696!2d80.1725574!3d13.0653633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261cdbf3a87d5%3A0x81abea73c6e63dba!2sGet%20Your%20College!5e0!3m2!1sen!2sin!4v1716102516302!5m2!1sen!2sin"
            width='100%'
            height='300'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </div>
      <div className='div w-full grid place-items-center border-t-gray-300/80 py-3 border bg-background/90'>
        <h1>© 2024 Get Your College™. All Rights Reserved.</h1>
      </div>
    </main>
  );
}
