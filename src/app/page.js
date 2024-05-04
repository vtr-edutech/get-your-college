import Button from "@/components/ui/Button";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { Tooltip } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import WhyGYC from "@/components/WhySection";
import SixFeatures from "@/components/SixFeatures";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center w-full bg-[url("/bg.webp")] bg-[length:80%] bg-fixed'>
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
      <div className='flex w-full min-h-[90vh] md:min-h-[calc(95vh-8rem)] md:mt-0 mt-5 items-center md:justify-center flex-col p-4 md:p-14 gap-6 md:gap-4'>
        <h1 className='text-4xl md:text-6xl font-bold text-center'>
          Your Complete Guidance for
        </h1>

        <div className='flex md:gap-3 flex-col'>
          <h1 className='md:text-6xl text-5xl text-center font-bold'>
            <span className='relative text-sky-500'>
              Engineering{" "}
              {/* <span className='text-lg absolute top-0 left-[95%] text-sky-600'>
              (TNEA)
            </span> */}
            </span>
            {/* &nbsp;&nbsp;&nbsp; */}
            <span className='text-5xl'>&</span>
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

      {/* Why Get your college? */}
      <SixFeatures />

      {/* Screenshots section */}
      <WhyGYC />

      {/* Meet him section */}

      {/* What are you waiting for? */}
      <div className='flex p-8 md:h-[unset] h-[60vh] w-[90%] md:w-[80%] rounded-lg items-center justify-center flex-col gap-7 bg-card my-12'>
        <p className='text-base'>What are you waiting for?</p>
        <h1 className='md:text-4xl text-3xl font-semibold text-balance text-center'>
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
        />
      </div>

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

        <div className='flex flex-col justify-center gap-8 mt-4 md:w-full'>
          <h1 className='text-2xl font-semibold'>Get Your College</h1>
          <div className='grid grid-cols-2 gap-2'>
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
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5327439932926!2d80.17000177484307!3d13.06537978725863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526165149482d5%3A0x5b78d8d1489b9dfc!2sVTR%20Edu%20Solutions!5e0!3m2!1sen!2sin!4v1714782617990!5m2!1sen!2sin'
            width='100%'
            height='300'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </div>
      <div className='div w-full grid place-items-center border-t-gray-300/80 py-3 border bg-background/50'>
        <h1>© 2024 Get Your College™. All Rights Reserved.</h1>
      </div>
    </main>
  );
}
