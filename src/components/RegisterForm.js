"use client";
import Button from "@/components/ui/Button";
import { setUserData } from "@/store/userInfoSlice";
import { cn } from "@/utils";
import { Checkbox } from "@mantine/core";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const RegisterForm = ({ closeFn }) => {
  // console.log("🚀 ~ RegisterForm ~ closeFn:", closeFn)
  const router = useRouter();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  console.log("🚀 ~ Global State ~ userInfo:", userInfo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { update } = useSession();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoRequest = await axios.get("/api/user-info");
        console.log("🚀 ~ Fetched ~ userInfo:", userInfoRequest);
        // reset({
        //   firstName: userInfoRequest.firstName,
        //   lastName: userInfoRequest.lastName,
        //   email: userInfoRequest.email,
        //   gender: userInfoRequest.gender,
        //   group: userInfoRequest.group,
        //   address: userInfoRequest.address,
        // });
        if (!userInfoRequest.data.user?.firstName) {
          return setHasFetched(true)
        }
        dispatch(setUserData(userInfoRequest.data.user));
      } catch (error) {
        toast.error(error.response.data.error ?? error.error);
      }
    };
    console.log(userInfo);
    if (!userInfo.firstName && !hasFetched) {
       fetchUserInfo();
    } else {
      const dob = userInfo.dob? new Date(userInfo.dob): '';
      const dobToSet = dob? `${new Date(userInfo.dob).getFullYear()}-${new Date(userInfo.dob).getMonth()+1}-${new Date(userInfo.dob).getDate().toString().padStart(2, '0')}`: '';
      console.log('DOB: ', dobToSet);
      reset({
        firstName: userInfo.firstName ?? "",
        lastName: userInfo.lastName ?? "",
        email: userInfo.email ?? "",
        gender: userInfo.gender ?? "",
        group: userInfo.group ?? "",
        district: userInfo.district ?? "",
        pincode: userInfo.pincode ?? "",
        dob: dobToSet
      });
      setIsChecked(true)
    }
  }, [userInfo.firstName]);

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
      console.log(data);
      if (JSON.stringify(data) == JSON.stringify(userInfo)) {
        toast.info("Already submitted")
        closeFn()
        return
      };
      try {
        setIsSubmitting(true);
        const registerReq = await axios.post("/api/register", data);
        console.log("🚀 ~ onSubmit ~ registerReq:", registerReq);
        toast.success(registerReq.data.message);
        await update({ name: data.firstName });
        dispatch(setUserData(data));
        closeFn();
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
        toast.error(error?.response?.data.error ?? error?.message);
        if (error?.response?.status == 401 || error?.response?.status == 403) {
          setTimeout(() => {
            signOut();
          }, 3000);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4 w-full", {
          "opacity-50 pointer-events-none": !userInfo.firstName || hasFetched,
        })}
      >
        {/* First name input */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>First Name</p>
          <input
            {...register("firstName", {
              required: { value: true, message: "Can't be empty" },
              // use values here and see what happens
              // or referehttps://react-hook-form.com/docs/useform defaultValues to figure out
              maxLength: {
                value: 80,
                message: "Max length is 80 characters only",
              },
              validate: (value) => value.trim() !== "" || "Invalid First name",
            })}
            type='text'
            className='w-full rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            // defaultValue={userInfo.firstName ?? ""}
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
            // defaultValue={userInfo.lastName ?? ""}
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
              pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
            })}
            type='text'
            className='w-full  rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            // defaultValue={userInfo.email ?? ""}
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
            // defaultValue={userInfo.gender ?? ""}
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
            // defaultValue={userInfo.group ?? ""}
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
        {/* District */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>District</p>
          <input
            {...register("district", {
              required: { value: true, message: "Required!" },
              minLength: { value: true, message: "Invalid District" },
              maxLength: {
                value: 200,
                message: "Max length of District exceeded",
              },
              validate: (value) => value.trim() !== "" || "Invalid District",
            })}
            type='text'
            className='w-full  rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            // defaultValue={userInfo.address ?? ""}
          />
          {errors["district"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["district"].message}
            </p>
          )}
        </div>
        {/* Pincode */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Pincode</p>
          <input
            {...register("pincode", {
              required: { value: true, message: "Required!" },
              minLength: { value: true, message: "Invalid Pincode" },
              maxLength: {
                value: 6,
                message: "Max length of Pincode exceeded",
              },
              validate: (value) => value.trim() !== "" || "Invalid Pincode",
            })}
            type='tel'
            inputMode='numeric'
            className='w-full  rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            // defaultValue={userInfo.address ?? ""}
          />
          {errors["pincode"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["pincode"].message}
            </p>
          )}
        </div>
        {/* DOB */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Date of Birth</p>
          <input
            {...register("dob", {
              required: { value: true, message: "Required!" },
              validate: (value) => {
                const date = new Date(value);
                const differenceInDate =
                  new Date(Date.now()).getFullYear() - date.getFullYear();
                if (differenceInDate <= 15)
                  return `Invalid Date of Birth: Calculated age is ${differenceInDate}`;
              },
            })}
            type='date'
            placeholder='DD/MM/YYYY'
            className='w-full placeholder:text-sm rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300'
            // defaultValue={userInfo.dob ? `: ''}
          />
          {errors["dob"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["dob"].message}
            </p>
          )}
        </div>

        {/* Temporarily disabling this, maybe enable later if client needs */}
        {/* Agree or not */}
        <div className='flex gap-2 items-start'>
          <Checkbox label='I authorize &apos;Get Your Colleges&apos; to contact me regarding
            events, updates and admission support via Email, SMS and Whatsapp
            calls.' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        </div>
        <Button
          label={"Confirm Details"}
          isDisabled={!userInfo || isSubmitting || !isChecked}
          asButton
        />
      </form>
    </div>
  );
};

export default RegisterForm;
