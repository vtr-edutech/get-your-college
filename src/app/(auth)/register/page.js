"use client";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
        console.log(data);
        // send data to server
        // automatically redirect to home page after setting JWT in cookie
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
            {...register("First Name", {
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
          {errors["First Name"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["First Name"].message}
            </p>
          )}
        </div>
        {/* Last name */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Last Name</p>
          <input
            {...register("Last Name", {
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
          {errors["Last Name"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["Last Name"].message}
            </p>
          )}
        </div>
        {/* Email */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>E-mail</p>
          <input
            {...register("Email", {
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
          {errors["Email"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["Email"].message}
            </p>
          )}
        </div>
        {/* Gender */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Gender</p>
          <select
            {...register("Gender", {
              required: true,
              validate: (value) =>
                ["Male", "Female", "Other"].includes(value) || "Invalid Gender",
            })}
            className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
          >
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"Other"}>Other</option>
          </select>
          {errors["Gender"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["Gender"].message}
            </p>
          )}
        </div>
        {/* Current pursuit */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Group</p>
          <select
            {...register("Group", {
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
          {errors["Group"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["Group"].message}
            </p>
          )}
        </div>
        {/* Address */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Address</p>
          <input
            {...register("Address", {
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
          {errors["Address"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["Address"].message}
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
