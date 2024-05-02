import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export function testNumber(number) {
  const regex = /^[5-9]\d{9}$/;
  return regex.test(number);
}

export function random({ start = 0, end = 10 }) {
  return Math.floor(start + (Math.random() * end));
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  let digits =
    "0123456789";
  let OTP = "";
  let len = digits.length;
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }
  return OTP;
}

export const getWindowSize = () => {
  const isWindowDefined = typeof window !== "undefined";
  return {
    height: isWindowDefined ? window.innerHeight : -1,
    width: isWindowDefined ? window.innerWidth : -1,
  };
};

export const tw = resolveConfig(tailwindConfig);
export const inter = Inter({ subsets: ["latin"] });