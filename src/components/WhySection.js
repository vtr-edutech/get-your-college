"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "./ui/Button";
import Image from "next/image";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const screenshotsData = [
  {
    id: 0,
    name: "Cut-off calculator",
    url: "/screenshots/cutoff-calc.webp",
  },
  {
    id: 1,
    name: "Cut-off filtering",
    url: "/screenshots/cutoff-calculator.webp",
  },
  {
    id: 2,
    name: "Colleges Info",
    url: "/screenshots/colleges.webp",
  },
  {
    id: 3,
    name: "Choice list selection",
    url: "/screenshots/choice-list.webp",
  },
  {
    id: 4,
    name: "Choice list preparation",
    url: "/screenshots/choice-list-dwn.webp",
  },
];

export default function WhyGYC() {
  const [currentStep, setCurrentStep] = useState(0);
  const currentData = useMemo(
    () => screenshotsData.find((x) => x.id === currentStep),
    [currentStep]
  );

  const skipNextSS = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % screenshotsData.length);
  }, []);

  useEffect(() => {
    let intervalSkip = setInterval(skipNextSS, 1000 * 8);

    return () => clearInterval(intervalSkip);
  }, [skipNextSS]);

  return (
    <div className='flex w-full min-h-screen md:min-h-[90vh] items-center flex-col p-4 md:p-14 gap-8'>
      <p className='text-sm mt-4 px-2 py-1 outline outline-2 outline-gray-400 rounded-full'>
        Presenting you
      </p>
      <h1 className='text-4xl md:text-5xl font-bold text-center'>
        The Most Versatile <br />
        College Prediction Service
      </h1>
      <p className='text-lg'>
        Forget the <strong>unintuitive and bland</strong> UI. With Get Your
        College, avoid confusion and focus only on colleges that you need
      </p>

      {/* Div of buttons */}
      <div className='flex gap-3 items-center mt-3 flex-wrap'>
        {screenshotsData.map((ss) => (
          <Button
            key={ss.id}
            onClick={() => setCurrentStep(ss.id)}
            asButton
            label={ss.name}
            className={`px-5 w-fit ${
              currentData.id === ss.id
                ? ""
                : "text-black/80 bg-transparent outline outline-1 outline-gray-800"
            }`}
          />
        ))}
      </div>
      <div className='grid place-items-center w-full mt-4 relative'>
        <Image
          src={currentData.url}
          width={1077}
          height={600}
          className='object-contain scale-[calc(1-8rem)] transition-opacity animate-fade-in'
          quality={90}
          key={currentData.id}
          alt={currentData.name}
        />
        <div className='grid place-items-center absolute w-fit h-fit -top-[13%] right-0 md:-top-[6%] md:right-[12%]'>
          <CountdownCircleTimer
            isPlaying
            key={currentData.id}
            colors={["#004777"]}
            colorsTime={[8]}
            size={20}
            duration={8}
            strokeWidth={3}
          />
        </div>
      </div>
    </div>
  );
}
