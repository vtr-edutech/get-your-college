"use client";
import Button from "@/components/ui/Button";
import { setUserData } from "@/store/userInfoSlice";
import { cn } from "@/utils";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo);
  console.log("🚀 ~ RegisterForm ~ userInfo:", userInfo)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoRequest = await axios.get('/api/user-info');
        console.log("🚀 ~ fetchUserInfo ~ userInfo:", userInfoRequest)
        dispatch(setUserData(userInfoRequest.data.user));
      } catch (error) {
        toast.error(error.response.data.error ?? error.message);
      }
    }
    if (!userInfo.firstName) fetchUserInfo();
  }, [userInfo])
  

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
        console.log(data);
        try {
          const registerReq = await axios.post("/api/register", data);
          console.log("🚀 ~ onSubmit ~ registerReq:", registerReq)
          toast.success(registerReq.data.message);
          setTimeout(() => {
            router.refresh();
          }, 2000);
        } catch (error) {
          console.log("🚀 ~ onSubmit ~ error:", error)
          toast.error(error.response.data.error ?? error.message);
          if (error.response.status == 401 || error.response.status == 403) {
            setTimeout(() => {
              signOut();
            }, 3000);
          }
        }
    }
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <h2 className='font-medium text-sm text-black/90'>
        Tell us about yourself...
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-4 w-full', { 'opacity-20': !userInfo })}
      >
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
            className='w-full rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            value={userInfo.firstName ?? ''}
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
            className='w-full  rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            value={userInfo.lastName ?? ''}
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
            className='w-full  rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            value={userInfo.email ?? ''}
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
            className='w-full  rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            value={userInfo.gender ?? ''}
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
            className='w-full  rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            value={userInfo.group ?? ''}
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
            className='w-full  rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            value={userInfo.address ?? ''}
          />
          {errors["address"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["address"].message}
            </p>
          )}
        </div>

        {/* Temporarily disabling this, maybe enable later if client needs */}
        {/* Agree or not */}
        {/* <div className='flex gap-2'>
          <input
            id='agree'
            type='checkbox'
            className='checked:bg-fill-black'
            onInput={() => setIsChecked(!isChecked)}
          />
          <label htmlFor='agree' className='font-normal text-sm'>
            I agree to service terms and conditions
          </label>
        </div> */}
        <Button label={"Confirm Details"} isDisabled={!userInfo} asButton />
      </form>
    </div>
  );
};

export default RegisterForm;
