"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { LuSearch } from "react-icons/lu";

const Home = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    trigger,
    setError,
  } = useForm();

  const searchSubmission = async (data) => {
    if (Object.keys(data).length !== 0) {
      console.log(data);
      if (parseInt(data.MinCutoff) > parseInt(data.MaxCutoff))
        setError(
          "MinCutoff",
          {
            type: "validate",
            message: "Starting cutoff should be less than Ending cutoff",
          },
          { shouldFocus: true }
        );
    }
  };

  return (
    <>
      <h1 className='font-medium text-2xl'>
        Let&apos;s get the right college for you
      </h1>
      <h3 className='font-normal text-base'>
        Enter 12th Cut-Off marks and choose Category
      </h3>
      <form
        className='flex gap-2 mt-3 items-center'
        onSubmit={handleSubmit(searchSubmission)}
      >
        {/* Min cutoff */}
        <div className='flex flex-col gap-1 items-center relative'>
          <input
            // min={0}
            // max={200}
            type='number'
            name='starting-cutoff'
            id='starting-cutoff'
            placeholder='Starting Cut-Off'
            className='bg-card p-2 w-44 rounded-md focus:outline-1 focus:outline-gray-200'
            {...register("MinCutoff", {
              required: { value: true, message: "This field is required" },
              min: {
                value: 0,
                message: "Minimum cutoff should be greater than 0",
              },
              max: {
                value: 200,
                message: "Minimum cutoff should be less than 200",
              },
            })}
          />
          {errors["MinCutoff"] && (
            <p className='text-xs text-red-500 font-light absolute -bottom-8 left-0'>
              {errors["MinCutoff"].message}
            </p>
          )}
        </div>
        {/* Max cutoff */}
        <div className='flex flex-col gap-1 items-center relative'>
          <input
            type='number'
            name='ending-cutoff'
            id='ending-cutoff'
            placeholder='Ending Cut-Off'
            className='bg-card p-2 w-44 rounded-md focus:outline-1 focus:outline-gray-200'
            {...register("MaxCutoff", {
              required: { value: true, message: "This field is required" },
              min: {
                value: 0,
                message: "Maximum cutoff should be greater than 0",
              },
              max: {
                value: 200,
                message: "Maximum cutoff should be less than 200",
              },
            })}
          />
          {errors["MaxCutoff"] && (
            <p className='text-xs text-red-500 font-light absolute -bottom-8 left-0'>
              {errors["MaxCutoff"].message}
            </p>
          )}
        </div>
        {/* Dept */}
        <div className='flex flex-col gap-1 items-center relative'>
          <select
            name='category'
            defaultValue={"select"}
            className='bg-card p-2 pr-8 rounded-md focus:outline-1 focus:outline-gray-200'
            id='category'
            {...register("Dept", {
              required: { value: true, message: "This field is required" },
              validate: (value) =>
                (value !== "select" && [
                  "CSE",
                  "ECE",
                  "IT",
                  "CCE",
                  "AIDS",
                  "ICE",
                  "MECH",
                ].includes(value)) || 'Invalid value selected!'
            })}
          >
            <option value='select'>Select Department</option>
            <option value='CSE'>CSE</option>
            <option value='ECE'>ECE</option>
            <option value='IT'>IT</option>
            <option value='CCE'>CCE</option>
            <option value='AIDS'>AIDS</option>
            <option value='ICE'>ICE</option>
            <option value='MECH'>MECH</option>
          </select>
          {errors["Dept"] && (
            <p className='text-xs text-red-500 font-light absolute -bottom-8 left-0'>
              {errors["Dept"].message}
            </p>
          )}
        </div>
        {/* Category */}
        <div className='flex flex-col gap-1 items-center relative'>
          <select
            name='category'
            defaultValue={"Select"}
            className='bg-card p-2 pr-8 rounded-md focus:outline-1 focus:outline-gray-200'
            id='category'
            {...register("Category", {
              required: { value: true, message: "This field is required" },
              validate: (value) =>
                (value !== "select" && [
                  "OC",
                  "BC",
                  "BCM",
                  "MBC",
                  "SC",
                  "ST",
                  "SCA",
                ].includes(value)) || 'Invalid value selected!'
            })}
          >
            <option value='select'>Select Category</option>
            <option value='OC'>OC</option>
            <option value='BC'>BC</option>
            <option value='BCM'>BCM</option>
            <option value='MBC'>MBC</option>
            <option value='SC'>SC</option>
            <option value='ST'>ST</option>
            <option value='SCA'>SCA</option>
          </select>
          {errors["Category"] && (
            <p className='text-xs text-red-500 font-light absolute -bottom-8 left-0'>
              {errors["Category"].message}
            </p>
          )}
        </div>
        <button className='bg-fill-black px-6 py-1 text-lg rounded flex gap-2 text-white items-center'>
          <LuSearch />
          Go
        </button>
      </form>
    </>
  );
};

export default Home;
