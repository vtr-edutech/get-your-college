'use client'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const Button = ({ label, to = '', ...props }) => {
    const router = useRouter();

  return (
    <button className='bg-fill-black w-full py-[10px] rounded text-fill-white' {...props} onClick={() => to != '' && router.push(to)}>
        {label}
    </button>
  )
}

export default Button