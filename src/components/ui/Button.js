"use client";
import { cn } from "@/utils";
import Link from "next/link";
import React from "react";

const Button = ({ label, to = "", onClick = () => null, isDisabled, asButton = false, className = '', ...props }) => {

  return asButton ? (
    <button
      className={cn(
        `bg-fill-black w-full py-[10px] rounded text-center transition-opacity text-fill-white `,
        {
          "opacity-30 pointer-events-none": isDisabled,
        },
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  ) : (
    <Link
      className={cn(
        `bg-fill-black w-full py-[10px] rounded text-center transition-opacity text-fill-white `,
        {
          "opacity-30 pointer-events-none": isDisabled,
        },
        className
      )}
      href={to ?? "#"}
      onClick={onClick}
      data-aos={props['data-aos']}
      data-aos-delay={props['data-aos-delay']}
      data-aos-duration={props['data-aos-duration']}
    >
      {label}
    </Link>
  );
};

export default Button;
