import { Skeleton } from '@mantine/core';
import React from 'react'

const NavBarLoader = () => {
  return window?.innerWidth < 768 ? (
    <div className='fixed left-0 flex max-h-16 md:hidden gap-2 justify-around items-center w-full bottom-0 z-50 px-2 py-2 shadow shadow-black/40 bg-white'>
      {Array(5)
        .fill(1)
        .map((_, i) => (
          <Skeleton key={i}>
            <div
              key={i}
              className={
                "flex gap-1 flex-col items-center justify-center p-1.5 h-full rounded md:hidden"
              }
            >
              <div className='h-2 w-2'></div>
              <p className='text-xs text-black/50'>MENU NAME</p>
            </div>
          </Skeleton>
        ))}
    </div>
  ) : (
    <div className='hidden gap-3 md:flex-col md:flex pt-8 md:h-screen md:items-center md:w-72 md:bg-white md:fixed md:top-0 md:left-0'>
      <Skeleton circle width={100} height={100}></Skeleton>
      <br />
      <br />
      {Array(5)
        .fill(1)
        .map((_, i) => (
          <Skeleton key={i} width={'90%'} height={60}>
          </Skeleton>
        ))}
    </div>
  );
}

export default NavBarLoader