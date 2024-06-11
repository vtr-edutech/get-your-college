"use client";
import { DISABLE_AD_BANNER } from "@/constants";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { getWindowSize } from "@/utils";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import Link from "next/link";

const AD_DATA = [
  {
    name: "Anna University",
    src: "/ads/ad-001.png",
    link: "https://annauniv.edu/",
  },
  {
    name: "Saveetha Engineering College",
    src: "/ads/ad-002.webp",
    link: "https://saveetha.ac.in/",
  },
  {
    name: "Sairam Engineering College",
    src: "/ads/ad-003.webp",
    link: "https://www.sairam.edu.in",
  },
];

function AdvertBanner() {
  const [windowSize, setWindowSize] = useState({ width: 1453, height: 1234 });
  // const autoplay = useRef(Autoplay({ delay: 2000 }));

  useEffect(() => {
    setWindowSize(getWindowSize());
  }, []);

  return !DISABLE_AD_BANNER ? (
    <Carousel
      slideSize="100%"
      height={windowSize.width < 768 ? 100 : 200}
      slideGap="md"
      withControls
      controlsOffset="xs"
      controlSize={windowSize.width < 768 ? 20 : 40}
      loop
      // plugins={[autoplay.current]}
      // onMouseEnter={autoplay.current.stop}
      // onMouseLeave={autoplay.current.reset}
      withIndicators
      initialSlide={Math.floor(Math.random() * AD_DATA.length)}
    >
      {AD_DATA.map((ad, i) => (
        <Carousel.Slide key={i} className="flex w-full justify-center">
          <Link href={ad.link} target="_blank" className="flex justify-center">
            <Image
              alt={ad.name}
              width={756}
              height={windowSize.width < 768 ? 100 : 55}
              src={ad.src}
              className="object-contain"
            />
          </Link>
        </Carousel.Slide>
      ))}
    </Carousel>
  ) : null;
}

export default AdvertBanner;
