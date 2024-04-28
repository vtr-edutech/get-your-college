import * as jose from "jose";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export function testNumber(number) {
  const regex = /^[5-9]\d{9}$/;
  return regex.test(number);
}

export async function issueJWT(userId, userName) {
  // const token = jwt.sign({
  //   id: userId,
  //   name: userName
  // }, process.env.JWT_SECRET, { expiresIn: '20m' })
  const token = await new jose.SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('2hrs')
    .setSubject({ id: userId, name: userName })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return token;
}

export async function issueRegistrationJWT(userId) {
  const token = await new jose.SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('1d')
    .setSubject({ id: userId })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return token;
}

export async function verifyRegistrationJWT(token) {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload.sub.id;
  } catch (error) {
    console.log("🚀 ~ verifyRegistrationJWT ~ error:", error);
    return null;
  }
}

export async function verifyJWT(token) {
  try {
    if (!token) return null;
    const decoded = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    // console.log("🚀 ~ verifyJWT ~ decoded:", decoded);
    return decoded.payload;
  } catch (error) {
    console.log("🚀 ~ verifyRegistrationJWT ~ error:", error);
    return null;
  }
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