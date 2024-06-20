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
    <main className='flex min-h-screen w-full flex-col items-center bg-[url("/bg.webp")] bg-fixed md:bg-[length:80%]'>
      {/* Header */}
      <header className="flex w-full items-center justify-between px-5 py-4 md:px-8 md:py-6">
        {/* Logo here */}
        {/* <Image
          src={'/logo_new.png'}
          width={125}
          height={125}
          quality={100}
          alt="Get Your College logo"
        /> */}
        <div className="flex items-center justify-center gap-10 md:justify-start md:gap-6">
          <Image
            src={"/logo.png"}
            width={45}
            height={45}
            quality={100}
            className="h-full w-[15%] md:h-[unset] md:w-[unset]"
            alt="Get Your College logo"
          />
          <h1 className="flex flex-col text-center text-lg font-semibold md:text-2xl">
            Get Your College
            <span className="text-sm font-normal md:text-base">
              Quantum shift to your career
            </span>
          </h1>
        </div>
        {/* Login button */}
        <Button
          label={
            <div className="flex items-center gap-1 px-0 transition-all group-hover:gap-2">
              <CiLogin />
              <h2>Log In</h2>
            </div>
          }
          to="/login"
          className="hidden w-fit bg-mantine-blue px-4 py-2 md:block md:px-7 md:py-2"
        />
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Why Get your college? */}
      <SixFeatures />

      {/* Screenshots section */}
      <WhyGYC />

      {/* Meet him section */}
      <div className="flex min-h-[30vh] w-full flex-col items-center gap-8 p-4 md:min-h-[90vh] md:p-14">
        <p className="mt-4 rounded-full px-2 py-1 text-sm outline outline-2 outline-gray-400">
          Our expert
        </p>
        <h1 className="text-center text-4xl font-bold md:text-5xl">
          Meet your guide, Dinesh Kumar
        </h1>
        <iframe
          className="h-[30vh] md:h-[100vh]"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/hy95MwKCXOU?si=Drxtxdwlc1U0vC1A"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* What are you waiting for? */}
      <WhatAreYourWaitingFor />

      {/* Footer */}
      <div className="mt-6 flex w-full flex-col items-start justify-between gap-12 bg-background/70 px-3 py-12 md:flex-row md:px-16 md:py-10">
        <div className="mt-4 grid h-full w-full place-items-center">
          <Image
            src={"/logo_new.png"}
            width={180}
            height={180}
            quality={100}
            alt="Get Your College logo"
          />
        </div>

        <div className="mt-4 flex flex-col justify-center gap-4 p-3 md:w-full md:gap-8 md:p-0">
          <h1 className="text-2xl font-semibold">Get Your College</h1>
          <div className="grid grid-cols-2 gap-x-1 md:gap-2">
            <Link href={"/about"} className="hover:underline">
              About us ›
            </Link>
            <Link href={"/contact-us"} className="hover:underline">
              Contact us ›
            </Link>
            <Link href={"/privacy-policy"} className="hover:underline">
              Privacy Policy ›
            </Link>
            <Link href={"/terms"} className="hover:underline">
              Terms and Conditions›
            </Link>
          </div>
        </div>

        <div className="map grid w-full place-items-center md:max-w-[40%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5331177025696!2d80.1725574!3d13.0653633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261cdbf3a87d5%3A0x81abea73c6e63dba!2sGet%20Your%20College!5e0!3m2!1sen!2sin!4v1716102516302!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="div grid w-full place-items-center border border-t-gray-300/80 bg-background/90 py-3">
        <h1>© 2024 Get Your College™. All Rights Reserved.</h1>
      </div>
    </main>
  );
}
