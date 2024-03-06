"use client";
import Link from "next/link";
import React from "react";

const Button = ({ label, to = "", onClick = () => null, isDisabled, asButton = false }) => {

  return (
    asButton ? 
      <button
        className={`bg-fill-black w-full py-[10px] rounded text-center transition-opacity text-fill-white ${
          isDisabled ? "opacity-20 pointer-events-none" : ""
        }`}
        onClick={onClick}
      >
        {label}
      </button>
    :
      <Link
        className={`bg-fill-black w-full py-[10px] rounded text-center transition-opacity text-fill-white ${
          isDisabled ? "opacity-20 pointer-events-none" : ""
        }`}
        href={to ?? '#'}
        onClick={onClick}
      >
        {label}
      </Link>
  );
};

export default Button;
