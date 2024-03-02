import AuthCard from '@/components/AuthCard'
import Button from '@/components/ui/Button'
import { PROJECT_NAME_TITLE_CASE } from '@/constants'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata = {
  title: `Login to continue | ${PROJECT_NAME_TITLE_CASE}`
}

const Login = () => {
  
  return (
    <AuthCard>
      <h2 className='font-medium text-xl text-black/90'>Let&apos;s create an account for you...</h2>
      <div className='flex flex-col gap-1'>
        <p className='font-light text-xs'>Provide your mobile number to send OTP</p>
        <input type='text' inputMode='numeric' placeholder='+91' className='w-[22rem] rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300' />
      </div>
      <Button label={'Get OTP'} to={'/otp'} />
    </AuthCard>
  )
}

export default Login