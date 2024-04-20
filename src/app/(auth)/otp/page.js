"use client";
import AuthCard from "@/components/AuthCard";
import { PinInput } from "@mantine/core";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const OTPInputRef = useRef();
  const [isOTPProvided, setIsOTPProvided] = useState(false);
  const [mobile, setMobile] = useState(null);
  
  const handleOTPSubmit = async (otp) => {
  
    // testing logic only
    try {
      // const verifyOTPRequest = await axios.post('/api/verify-otp', { otp, mobile });
      // toast.success(verifyOTPRequest.data.message);
      // if (verifyOTPRequest.status == 200) return router.replace('/home');
      // router.push('/register'); // just sending to any of the auth routes and it automatically send back if cookie to /home
      setIsOTPProvided(true)
      const testing = await signIn('credentials', { mobile, otp, redirect: false });
      if (!testing.ok) return toast.error('Mobile or OTP Invalid. Please try again!');
      if (testing.ok) router.refresh();

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error ?? error.message);
    } finally {
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
        <PinInput oneTimeCode inputMode="numeric" length={6} inputType="tel" placeholder="-" styles={{
            input: {
              fontFamily: "inherit"
            },
            root: {
              opacity: isOTPProvided ? '60%': '100%',
              alignSelf: "center"
            }
          }} 
          onComplete={handleOTPSubmit}
        />
      </div>
    </AuthCard>
  );
};

export default Login;
