"use client";
import { DISABLE_AD_BANNER } from "@/constants";
import Image from "next/image";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const AD_DATA = [
  {
    name: "Anna University",
    src: "/ads/ad-001.png",
  },
  {
    name: "Anna University",
    src: "/ads/ad-001.png",
  },
];

function AdvertBanner() {
  return !DISABLE_AD_BANNER ? (
    <div className="ad m-1 flex max-h-36 items-center justify-center">
      <Splide
        options={{
          width: "50%",
        }}
      >
        {AD_DATA.map((ad, i) => (
          <SplideSlide
            key={i}
            className="flex max-w-fit items-center justify-center"
          >
            <Image alt={ad.name} width={756} height={55} src={ad.src} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  ) : null;
}

export default AdvertBanner;
