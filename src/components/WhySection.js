"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "./ui/Button";
import Image from "next/image";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Aos from "aos";

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

  useEffect(() => {
    Aos.init();
  }, []);
  
  useEffect(() => {
    const skipNextSS = () => {
      setCurrentStep((prev) => (prev + 1) % screenshotsData.length);
    };

    let intervalSkip = setInterval(skipNextSS, 1000 * 8);
    
    return () => clearInterval(intervalSkip);

  }, [currentStep]);

  return (
    <div className='flex w-full min-h-screen md:min-h-[90vh] items-center flex-col p-4 md:p-14 gap-8'>
      <p
        className='text-sm mt-4 px-2 py-1 outline outline-2 outline-gray-400 rounded-full'
        data-aos='fade-up'
        data-aos-duration='300'
      >
        Presenting you
      </p>
      <h1
        className='text-4xl md:text-5xl font-bold text-center'
        data-aos='fade-up'
        data-aos-duration='500'
        data-aos-delay='300'
      >
        The Most Versatile <br />
        College Prediction Service
      </h1>
      <p
        className='text-lg'
        data-aos='fade-up'
        data-aos-duration='500'
        data-aos-delay='800'
      >
        Forget the <strong>unintuitive and bland</strong> UI. With Get Your
        College, avoid confusion and focus only on colleges that you need
      </p>

      {/* Div of buttons */}
      <div
        className='flex gap-3 items-center mt-3 flex-wrap'
        data-aos='fade-in'
        data-aos-duration='500'
        data-aos-delay='1000'
      >
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
      <div
        className='grid place-items-center w-full mt-4 relative'
        data-aos='fade-in'
        data-aos-duration='500'
        data-aos-delay='1000'
      >
        <Image
          src={currentData.url}
          width={1077}
          fetchPriority='high'
          loading='eager'
          priority
          height={600}
          className='object-contain scale-[calc(1-8rem)] transition-opacity animate-fade-in'
          quality={85}
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
