"use client";

import { cn } from "@/utils";
import AOS from "aos";
import { useEffect } from "react";
import { BsListCheck } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { LuMousePointerClick } from "react-icons/lu";
import { TbHeartHandshake } from "react-icons/tb";

const FEATURES = [
  {
    icon: ({ color }) => <CiSearch className={color} size={20} />,
    title: "Cutoff & Ranking",
    color: { text: "text-orange-500", bg: "bg-orange-200/50" },
  },
  {
    icon: ({ color }) => <FiCheckCircle className={color} size={20} />,
    title: "Predict Best College",
    color: { text: "text-green-500", bg: "bg-green-200/50" },
  },
  {
    icon: ({ color }) => <BsListCheck className={color} size={20} />,
    title: "Choice List",
    color: { text: "text-fuchsia-500", bg: "bg-fuchsia-200/50" },
  },
  {
    icon: ({ color }) => <IoTimeOutline className={color} size={21} />,
    title: "Timely updates",
    color: { text: "text-sky-500", bg: "bg-sky-200/50" },
  },
  {
    icon: ({ color }) => <LuMousePointerClick className={color} size={20} />,
    title: "Ease of access",
    color: { text: "text-red-500", bg: "bg-red-200/50" },
  },
  {
    icon: ({ color }) => <TbHeartHandshake className={color} size={20} />,
    title: "User-friendly interface",
    color: { text: "text-teal-500", bg: "bg-teal-200/50" },
  },
];

const FeatureCard = ({ icon: Icon, title, color, ...props }) => {
  return (
    <div
      className={cn([
        `flex items-center gap-4 md:gap-2 py-5 px-8 outline outline-1 outline-gray-200 shadow-sm rounded-md`,
        color.bg,
      ])}
      data-aos={props["data-aos"]}
      data-aos-duration={props["data-aos-duration"]}
      data-aos-delay={props["data-aos-delay"]}
    >
      <Icon color={color.text} />
      <h3 className={"text-lg tracking-wide font-semibold text-black/60"}>
        {title}
      </h3>
    </div>
  );
};

export default function SixFeatures() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      id='more'
      className='flex w-full min-h-screen md:min-h-[90vh] items-center flex-col p-4 md:p-14 gap-8'
    >
      <h1 className='text-4xl md:text-5xl mt-4 font-bold text-center' data-aos="fade-up" data-aos-duration="400">
        Why choose <br /> Get Your College?
      </h1>
      <p className='text-lg' data-aos="fade-up" data-aos-delay="600" data-aos-duration="400">
        We provide compelling reasons for you to choose our service that you
        won&apos;t regret
      </p>

      <div className='grid grid-cols-1 grid-flow-row md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-12 md:w-[unset] w-full md:p-4'>
        {FEATURES.map((feature, i) => (
          <FeatureCard
            key={i + 9831}
            data-aos='zoom-out'
            data-aos-duration={200}
            data-aos-delay={(100 * i) + 1000}
            color={feature.color}
            title={feature.title}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
}
