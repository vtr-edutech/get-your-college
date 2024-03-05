"use client";
import AuthCard from "@/components/AuthCard";
import { OTPInput } from "input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const InputSlot = (props) => (
  <div className='w-10 h-10 rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'>
    {props.char !== null && props.char}
  </div>
);

const handleOTPSubmit = (e, router, ref) => {
  // logic to handle OTP submit

  // testing logic only
  // console.log(ref.current);
  ref.current.style.opacity = 10;
  setTimeout(() => {
    router.push("/register");
  }, 1000);
};

const Login = () => {
  const router = useRouter();
  const OTPInputRef = useRef();
  const [isOTPProvided, setIsOTPProvided] = useState(false);
  const [mobile, setMobile] = useState(null);

  // check once after comp mounts if mobile number is there in localstorage
  useEffect(() => {
    const number = localStorage.getItem('mobile');
    if (!number) return alert('We couldn\'t find the mobile number you entered. Please enter number again');
    setMobile(number);
  }, [])
  

  return (
    <AuthCard gap={8}>
      <h2 className='font-medium text-xl text-black/90'>
        Enter OTP to continue
      </h2>
      <div className='flex flex-col gap-5'>
        <p className='font-light text-xs'>We&apos;ve sent an OTP to {mobile} <Link href={'/mobile'} className="underline">Not your number?</Link> </p>
        <OTPInput
          ref={OTPInputRef}
          inputMode='numeric'
          onComplete={(e) => {
            setIsOTPProvided(!isOTPProvided);
            handleOTPSubmit(e, router, OTPInputRef);
          }}
          containerClassName={`group flex items-center has-[:disabled]:opacity-30`}
          disabled={isOTPProvided}
          maxLength={6}
          render={({ slots }) => (
            <div className='flex gap-2 w-full'>
              {slots.map((slot, i) => (
                <InputSlot {...slot} key={i} />
              ))}
            </div>
          )}
        />
      </div>
    </AuthCard>
  );
};

export default Login;
