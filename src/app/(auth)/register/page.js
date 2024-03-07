"use client";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
        console.log(data);
        try {
          const registerReq = await axios.post("/api/register", data);
          console.log("🚀 ~ onSubmit ~ registerReq:", registerReq)
          toast.success(registerReq.data.message);
          router.replace('/home');
        } catch (error) {
          console.log("🚀 ~ onSubmit ~ error:", error)
          toast.error(error.response.data.error ?? error.message);
          if (error.response.status == 401) {
            setTimeout(() => {
              router.replace('/login');
            }, 3000);
          }
        }
    }
  };

  return (
    <AuthCard gap={5}>
      <h2 className='font-medium text-xl text-black/90'>
        Tell us about yourself...
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {/* First name input */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>First Name</p>
          <input
            {...register("firstName", {
              required: { value: true, message: "Can't be empty" },
              maxLength: {
                value: 80,
                message: "Max length is 80 characters only",
              },
              validate: (value) => value.trim() !== "" || "Invalid First name",
            })}
            type='text'
            className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
          />
          {errors["firstName"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["firstName"].message}
            </p>
          )}
        </div>
        {/* Last name */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Last Name</p>
          <input
            {...register("lastName", {
              required: { value: true, message: "Can't be empty" },
              maxLength: {
                value: 80,
                message: "Max length is 100 characters only",
              },
              validate: (value) => value.trim() !== "" || "Invalid Last name",
            })}
            type='text'
            className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
          />
          {errors["lastName"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["lastName"].message}
            </p>
          )}
        </div>
        {/* Email */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>E-mail</p>
          <input
            {...register("email", {
              required: { value: true, message: "Required!" },
              maxLength: {
                value: 100,
                message: "Max length is 100 characters only",
              },
              pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
            })}
            type='text'
            className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
          />
          {errors["email"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["email"].message}
            </p>
          )}
        </div>
        {/* Gender */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Gender</p>
          <select
            {...register("gender", {
              required: true,
              validate: (value) =>
                ["male", "female", "other"].includes(value) || "Invalid Gender",
            })}
            className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"other"}>Other</option>
          </select>
          {errors["gender"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["gender"].message}
            </p>
          )}
        </div>
        {/* Current pursuit */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Group</p>
          <select
            {...register("group", {
              required: true,
              validate: (value) =>
                ["BWM", "CS", "CWCS"].includes(value) || "Invalid group",
            })}
            className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
          >
            <option value={"BWM"}>Bio with Math</option>
            <option value={"CS"}>Computer Science</option>
            <option value={"CWCS"}>Commerce with Computer Science</option>
          </select>
          {errors["group"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["group"].message}
            </p>
          )}
        </div>
        {/* Address */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Address</p>
          <input
            {...register("address", {
              required: { value: true, message: "Required!" },
              minLength: { value: true, message: "Invalid Address" },
              maxLength: {
                value: 200,
                message: "Max length of Address exceeded",
              },
              validate: (value) => value.trim() !== "" || "Invalid Address",
            })}
            type='text'
            className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
          />
          {errors["address"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["address"].message}
            </p>
          )}
        </div>
        {/* Agree or not */}
        <div className='flex gap-2'>
          <input
            id='agree'
            type='checkbox'
            className='checked:bg-fill-black'
            onInput={() => setIsChecked(!isChecked)}
          />
          <label htmlFor='agree' className='font-normal text-sm'>
            I agree to service terms and conditions
          </label>
        </div>
        <Button
          label={"Confirm Details"}
          className={"opacity-20"}
          isDisabled={!isChecked}
          asButton
        />
      </form>
    </AuthCard>
  );
};

export default Register;
