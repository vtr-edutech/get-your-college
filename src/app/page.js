import Button from "@/components/ui/Button";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { LuMousePointerClick } from "react-icons/lu";
import { TbHeartHandshake } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import { BsListCheck } from "react-icons/bs";
import { cn } from "@/utils";
import { Tooltip } from "@mantine/core";
import Image from "next/image";
import svv from " engg.svg"

const FEATURES = [
  {
    icon: ({ color }) => <CiSearch className={color} size={20} />,
    title: "Cutoff & Ranking",
    color: { text: "text-orange-500", bg: "bg-orange-200/40" },
  },
  {
    icon: ({ color }) => <FiCheckCircle className={color} size={20} />,
    title: "Predict Best College",
    color: { text: "text-green-500", bg: "bg-green-200/40" },
  },
  {
    icon: ({ color }) => <BsListCheck className={color} size={20} />,
    title: "Choice List",
    color: { text: "text-fuchsia-500", bg: "bg-fuchsia-200/40" },
  },
  {
    icon: ({ color }) => <IoTimeOutline className={color} size={21} />,
    title: "Timely updates",
    color: { text: "text-sky-500", bg: "bg-sky-200/40" },
  },
  {
    icon: ({ color }) => <LuMousePointerClick className={color} size={20} />,
    title: "Ease of access",
    color: { text: "text-red-500", bg: "bg-red-200/40" },
  },
  {
    icon: ({ color }) => <TbHeartHandshake className={color} size={20} />,
    title: "User-friendly interface",
    color: { text: "text-teal-500", bg: "bg-teal-200/40" },
  },
];

const FeatureCard = ({ icon: Icon, title, color }) => {
  return (
    <div
      className={cn([
        `flex items-center gap-4 md:gap-2 py-5 px-8 outline outline-1 outline-gray-200 shadow-sm rounded-md`,
        color.bg,
      ])}
    >
      <Icon color={color.text} />
      <h3 className={"text-lg tracking-wide font-semibold text-black/60"}>
        {title}
      </h3>
    </div>
  );
};

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center w-full'>
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
        <div className='flex gap-6'>
          <Image
            src={"/logo.png"}
            width={45}
            height={45}
            quality={100}
            alt='Get Your College logo'
          />
          <h1 className='text-2xl flex flex-col font-semibold'>
            Get Your College
            <span className='font-normal text-base'>
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
          className='bg-mantine-blue w-fit px-4 py-2 md:px-7 md:py-2'
        />
      </header>

      {/* Hero Section */}
      <div className='flex w-full min-h-[90vh] md:min-h-[80vh] items-center md:justify-center flex-col p-4 md:p-14 gap-6 md:gap-4'>
        <h1 className='text-4xl md:text-6xl mt-4 font-bold text-center'>
          Your Complete Guidance for
        </h1>

        <div className='flex md:gap-3 flex-col'>
          <h1 className='md:text-6xl text-5xl text-center font-bold'>
            <span className='relative text-sky-500'>
              Engineering{" "}
              <img src={svv} className="absolute top-0 left-0" alt="" />
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
      <div className='flex w-full min-h-screen md:min-h-[90vh] items-center flex-col p-4 md:p-14 gap-8'>
        <h1 className='text-4xl md:text-5xl mt-4 font-bold text-center'>
          Why choose <br /> Get Your College?
        </h1>
        <p className='text-lg'>
          We provide compelling reasons for you to choose our service
        </p>

        <div className='grid grid-cols-1 grid-flow-row md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-12 md:w-[unset] w-full md:p-4'>
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={i + 9831}
              color={feature.color}
              title={feature.title}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
