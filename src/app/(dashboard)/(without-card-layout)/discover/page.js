import CutoffCalculator from '@/components/CutoffCalculator';
import Image from 'next/image'
import React from 'react'

const Discover = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex md:flex-row flex-col gap-4'>
        {/* Updates div */}
        <div className='flex flex-col p-6 gap-3 min-w-[60%] max-w-md rounded-md shadow-sm shadow-black/10 bg-white'>
          <h1 className='font-semibold text-xl'>Cutoff Calculator</h1>
          Calculate your cutoff with Physics, Chemistry and Math marks
          <CutoffCalculator />
        </div>

        {/* Topics div */}
        <div className='flex flex-col p-6 flex-1 rounded-md shadow-sm shadow-black/10 bg-white'>
          <h1 className='font-semibold text-xl'>Topics</h1>
          Connect with any of our socials to get latest updates
          <div className='flex w-full relative'>
            <Image
              src={"/Empty-pana.png"}
              height={180}
              width={300}
              className='self-center flex p-5'
              quality={95}
              alt='No data placeholder image'
            />
            <p className='text-primary/50 absolute -translate-x-1/2 left-[50%] bottom-2'>
              No data yet!
            </p>
          </div>
        </div>
      </div>

      {/* News */}
      <div className='flex flex-col rounded-md bg-white shadow-sm shadow-black/10 w-full p-6'>
        <h1 className='font-semibold text-xl'>News</h1>
        Connect with any of our socials to get latest updates
        {/* Invisible div for height */}
        <div className='h-64'></div>
      </div>

      {/* Flaoting socials */}
    </div>
  );
}

export default Discover