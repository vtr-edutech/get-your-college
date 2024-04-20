import Image from 'next/image'
import React from 'react'

const Discover = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex md:flex-row flex-col gap-4'>
        {/* Updates div */}
        <div className='flex flex-col p-6 min-w-[60%] max-w-md rounded-md shadow-sm shadow-black/10 bg-white'>
          <h1 className='font-semibold text-xl'>Updates</h1>
          Connect with any of our socials to get latest updates
          <div className='flex gap-4 w-full items-center justify-center flex-wrap shrink-0'>
            <a href='https://youtube.com' target='_blank' className='m-5'>
              <Image
                src={"/yt.png"}
                width={60}
                height={60}
                alt='Youtube Channel - Know your College'
              />
            </a>
            <a href='https://instagram.com' target='_blank' className='m-5'>
              <Image
                src={"/ig.png"}
                width={60}
                height={60}
                alt='Instagram - Know your College'
              />
            </a>
            <a href='https://facebook.com' target='_blank' className='m-5'>
              <Image
                src={"/fb.png"}
                width={70}
                height={70}
                alt='Facebook - Know your College'
              />
            </a>
            <a
              href='https://web.whatsapp.com/send?phone=9362667920&text&app_absent=0'
              target='_blank'
              className='m-5'
            >
              <Image
                src={"/wp.png"}
                width={70}
                height={70}
                alt='WhatsApp - Know your College'
              />
            </a>
          </div>
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
    </div>
  );
}

export default Discover