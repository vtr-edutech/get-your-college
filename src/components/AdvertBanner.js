import { DISABLE_AD_BANNER } from '@/constants';
import Image from 'next/image';
import React from 'react'

function AdvertBanner() {
  return !DISABLE_AD_BANNER ? (
    <div className='ad flex w-full m-1 items-center justify-center'>
      <Image alt='Advert' width={756} height={55} src={"/ads/ad-001.png"} />
      {/* <div className="bg-gray-200 rounded-md h-32 w-[756px]"></div> */}
    </div>
  ): null;
}

export default AdvertBanner