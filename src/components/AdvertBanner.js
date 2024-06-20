"use client";
import { DISABLE_AD_BANNER } from "@/constants";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { cn, getWindowSize } from "@/utils";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { usePathname } from "next/navigation";

const AD_DATA = [
  {
    name: "Anna University",
    src: "/ads/ad-001.png",
    link: "https://annauniv.edu/",
    place: "any",
  },
  // turn off exisiting saveetha ad
  // {
  //   name: "Saveetha Engineering College",
  //   src: "/ads/ad-002.webp",
  //   link: "https://saveetha.ac.in/",
  // },
  {
    name: "Saveetha Engineering College",
    src: "/ads/ad-005.webp",
    link: "https://saveetha.ac.in/",
    place: "/home",
  },
  {
    name: "Sairam Engineering College",
    src: "/ads/ad-007.webp",
    link: "https://sairam.edu.in/",
    place: "/home",
  },
  {
    name: "Saveetha Engineering College",
    src: "/ads/ad-006.webp",
    link: "https://saveetha.ac.in/",
    place: "/colleges",
  },
  {
    name: "Saveetha Engineering College",
    src: "/ads/ad-004.webp",
    link: "https://saveetha.ac.in/",
    place: "/discover",
  },
  {
    name: "Sairam Engineering College",
    src: "/ads/ad-003.webp",
    link: "https://www.sairam.edu.in",
    place: "any",
  },
];

function AdvertBanner({ className }) {
  const [windowSize, setWindowSize] = useState({ width: 1453, height: 1234 });
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const location = usePathname();

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
      plugins={[autoplay.current]}
      withIndicators
      className={cn(className)}
    >
      {AD_DATA.map((ad, i) =>
        !ad.place || ad.place === "any" ? (
          <Carousel.Slide key={i} className="flex w-full justify-center">
            <Link
              href={ad.link}
              target="_blank"
              className="flex justify-center"
            >
              <Image
                alt={ad.name}
                width={756}
                height={windowSize.width < 768 ? 100 : 55}
                src={ad.src}
                className="object-contain"
              />
            </Link>
          </Carousel.Slide>
        ) : ad.place === location ? (
          <Carousel.Slide key={i} className="flex w-full justify-center">
            <Link
              href={ad.link}
              target="_blank"
              className="flex justify-center"
            >
              <Image
                alt={ad.name}
                width={756}
                height={windowSize.width < 768 ? 100 : 55}
                src={ad.src}
                className="object-contain"
              />
            </Link>
          </Carousel.Slide>
        ) : null,
      )}
    </Carousel>
  ) : null;
}

export default AdvertBanner;
