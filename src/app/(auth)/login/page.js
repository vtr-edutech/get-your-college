"use client";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/ui/Button";
import { testNumber } from "@/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Login = () => {
  const mobileInputRef = useRef();
  const router = useRouter();
  const [canSubmit, setCanSubmit] = useState(false);
  const [reqStatus, setReqStatus] = useState("");

  // clear localstorage for good measures
  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async () => {
    setCanSubmit(false);
    setReqStatus("loading");
    try {
      let number = mobileInputRef.current.value;
      if (number.slice(0, 3) === '+91' && (number.slice(3).length === 10)) {
        number = number.slice(3);
      } else {
        // toast to show invalid number
      }
      const mobileReq = await axios.post("/api/send-otp", { mobile: number });
      localStorage.setItem('mobile', number); // temporarily setting mobile number in localstorage, so i can fetch it in /otp page
      alert(mobileReq.data.message);
      router.push('/otp');
    } catch (error) {
      console.log(error);
      setReqStatus("error");
      alert(error.response.data? error.response.data.error: error.message);
      mobileInputRef.current.value = '';
    } finally {
      setCanSubmit(true);
    }
  }

  return (
    <AuthCard>
      <h2 className='font-medium text-xl text-black/90'>
        Let&apos;s create an account for you...
      </h2>
      <div className='flex flex-col gap-1'>
        <p className='font-light text-xs'>
          Provide your mobile number to send OTP
        </p>
        <input
          type='text'
          inputMode='numeric'
          ref={mobileInputRef}
          onInput={(e) =>
            testNumber(e.currentTarget.value)
              ? setCanSubmit(true)
              : setCanSubmit(false)
          }
          placeholder='+91'
          className={`w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300`}
        />
      </div>
      <Button label={"Get OTP"} isDisabled={!canSubmit} onClick={handleSubmit} />
    </AuthCard>
  );
};

export default Login;
