import React from "react";
import { LuSearch } from "react-icons/lu";

const Home = () => {
  return (
    <>
      <h1 className='font-medium text-2xl'>
        Let&apos;s get the right college for you
      </h1>
      <h3 className='font-normal text-base'>
        Enter 12th Cut-Off marks and choose Category
      </h3>
      <div className='flex gap-2 mt-3'>
        <input
          min={0}
          max={200}
          type='number'
          name='starting-cutoff'
          id='starting-cutoff'
          placeholder='Starting Cut-Off'
          className='bg-card p-2 w-44 rounded-md focus:outline-1 focus:outline-gray-200'
        />
        <input
          min={0}
          max={200}
          type='number'
          name='ending-cutoff'
          id='ending-cutoff'
          placeholder='Ending Cut-Off'
          className='bg-card p-2 w-44 rounded-md focus:outline-1 focus:outline-gray-200'
        />
        <select
          name='category'
          defaultValue={"Select"}
          className='bg-card p-2 w-44 pr-8 rounded-md focus:outline-1 focus:outline-gray-200'
          id='category'
        >
          <option value='select'>Select</option>
          <option value='OC'>OC</option>
          <option value='BC'>BC</option>
          <option value='BCM'>BCM</option>
          <option value='MBC'>MBC</option>
          <option value='SC'>SC</option>
          <option value='ST'>ST</option>
          <option value='SCA'>SCA</option>
        </select>
        <button className="bg-fill-black px-6 py-2 text-lg rounded flex gap-2 text-white items-center">
          <LuSearch />
          Go
        </button>
      </div>
    </>
  );
};

export default Home;
