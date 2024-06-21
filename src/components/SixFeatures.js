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
        `flex items-center gap-4 rounded-md px-8 py-5 shadow-sm outline outline-1 outline-gray-200 md:gap-2`,
        color.bg,
      ])}
      data-aos={props["data-aos"]}
      data-aos-duration={props["data-aos-duration"]}
      data-aos-delay={props["data-aos-delay"]}
    >
      <Icon color={color.text} />
      <h3 className={"text-lg font-semibold tracking-wide text-black/60"}>
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
      id="more"
      className="flex min-h-screen w-full flex-col items-center gap-8 p-4 md:min-h-[90vh] md:p-14"
    >
      <h1
        className="mt-4 text-center text-4xl font-bold md:text-5xl"
        data-aos="fade-up"
        data-aos-duration="400"
      >
        Why choose <br /> Get Your College?
      </h1>

      <iframe
        className="h-[30vh] md:h-[80vh] md:w-[60vw]"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/hy95MwKCXOU?si=Drxtxdwlc1U0vC1A"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <p
        className="mt-16 text-lg"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="400"
      >
        We provide compelling reasons for you to choose our service that you
        won&apos;t regret
      </p>

      <div className="grid w-full grid-flow-row grid-cols-1 gap-4 md:w-[unset] md:grid-cols-3 md:grid-rows-2 md:gap-12 md:p-4">
        {FEATURES.map((feature, i) => (
          <FeatureCard
            key={i + 9831}
            data-aos="zoom-out"
            data-aos-duration={200}
            data-aos-delay={100 * i + 800}
            color={feature.color}
            title={feature.title}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
}
