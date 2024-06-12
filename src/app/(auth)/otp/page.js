"use client";
import AuthCard from "@/components/AuthCard";
import { inter } from "@/utils";
import { PinInput } from "@mantine/core";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const TIMEDOWN = 10;

const Login = () => {
  const router = useRouter();
  const OTPInputRef = useRef();
  const [isOTPProvided, setIsOTPProvided] = useState(false);
  const [mobile, setMobile] = useState(null);
  const [timer, setTimer] = useState(TIMEDOWN);
  const [canResend, setCanResend] = useState(false);

  const handleResendOTP = useCallback(async () => {
    try {
      setCanResend(false);
      await axios.post("/api/send-otp", { mobile: mobile });
      toast.success("OTP has been resent!");
      setTimer(TIMEDOWN);
    } catch (error) {
      console.log("🚀 ~ handleResendOTP ~ error:", error);
      toast.error(
        error.response.data.error ?? error.message ?? "Something went wrong",
      );
    }
  }, [mobile]);

  const handleOTPSubmit = async (otp) => {
    // testing logic only
    try {
      setIsOTPProvided(true);
      const testing = await signIn("credentials", {
        mobile,
        otp,
        redirect: false,
      });
      if (!testing.ok) {
        alert(testing.error + "");
        return toast.error("Mobile or OTP Invalid. Please try again!");
      }
      if (testing.ok) router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error ?? error.message);
      setIsOTPProvided(false);
    }
  };

  // check once after comp mounts if mobile number is there in localstorage
  useEffect(() => {
    const number = localStorage.getItem("mobile");
    if (!number) {
      toast.error(
        "We couldn't find the mobile number you entered. Please enter number again",
      );
      router.replace("/login");
    }
    setMobile(number);
  }, []);

  // effect for running countdown timer
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <AuthCard gap={4}>
      <h2 className="text-xl font-medium text-black/90">
        Enter OTP to continue
      </h2>
      <div className="flex flex-col gap-5">
        <p className="text-xs font-light">
          We&apos;ve sent an OTP to {mobile} <br />{" "}
          <Link href={"/login"} className="underline">
            Not your number?
          </Link>{" "}
        </p>
        <PinInput
          oneTimeCode
          inputMode="numeric"
          length={6}
          inputType="tel"
          placeholder=""
          styles={{
            input: {
              fontFamily: inter.style.fontFamily,
              borderRadius: 8,
            },
            root: {
              opacity: isOTPProvided ? "40%" : "100%",
              alignSelf: "center",
            },
          }}
          onComplete={handleOTPSubmit}
        />
      </div>
      <div className="flex items-center gap-2 text-xs">
        Please wait 00:{timer.toString().padStart(2, "0")}
        <Link
          className={`underline ${!canResend && "pointer-events-none opacity-50"}`}
          href={""}
          onClick={handleResendOTP}
        >
          Resend OTP
        </Link>
      </div>
    </AuthCard>
  );
};

export default Login;
