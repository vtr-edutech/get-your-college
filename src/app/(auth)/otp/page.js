"use client";
import AuthCard from "@/components/AuthCard";
import axios from "axios";
import { OTPInput } from "input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const InputSlot = (props) => (
  <div className='w-10 h-10 rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'>
    {props.char !== null && props.char}
  </div>
);

const Login = () => {
  const router = useRouter();
  const OTPInputRef = useRef();
  const [isOTPProvided, setIsOTPProvided] = useState(false);
  const [mobile, setMobile] = useState(null);
  
  const handleOTPSubmit = async (otp) => {
  
    // testing logic only
    try {
      const verifyOTPRequest = await axios.post('/api/verify-otp', { otp, mobile });
      toast.success(verifyOTPRequest.data.message);
      // if (verifyOTPRequest.status == 303) return router.replace('/home');
      router.push('/register'); // just sending to any of the auth routes and it automatically send back if cookie to /home
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error ?? error.message);
      setIsOTPProvided(false);
    }
  };

  // check once after comp mounts if mobile number is there in localstorage
  useEffect(() => {
    const number = localStorage.getItem('mobile');
    if (!number) {
      toast.error(
        "We couldn't find the mobile number you entered. Please enter number again"
      );
      router.replace('/login');
    }
    setMobile(number);
  }, [])
  

  return (
    <AuthCard gap={4}>
      <h2 className='font-medium text-xl text-black/90'>
        Enter OTP to continue
      </h2>
      <div className='flex flex-col gap-5'>
        <p className='font-light text-xs'>We&apos;ve sent an OTP to {mobile} <br /> <Link href={'/login'} className="underline">Not your number?</Link> </p>
        <OTPInput
          ref={OTPInputRef}
          inputMode='numeric'
          onComplete={(otp) => {
            setIsOTPProvided(!isOTPProvided);
            handleOTPSubmit(otp);
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
