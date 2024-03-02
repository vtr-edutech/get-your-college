'use client'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/ui/Button'
import { PROJECT_NAME_TITLE_CASE } from '@/constants'
import { OTPInput } from 'input-otp'
import React from 'react'

const InputSlot = ({ char }) => (<input value={char !== null ? char: ''} type='text' inputMode='numeric' className='w-10 rounded-md bg-input px-3 py-2 focus:outline-1 focus:outline-gray-300' />)

const Login = () => {
  return (
    <AuthCard gap={8}>
      <h2 className='font-medium text-xl text-black/90'>Enter OTP to continue</h2>
      <div className='flex flex-col gap-5'>
        <p className='font-light text-xs'>Get your number verified</p>
        <OTPInput containerClassName="group flex items-center has-[:disabled]:opacity-30" maxLength={6} render={({slots}) => (
            <div className='flex gap-2 w-full'>
            {
                slots.map((slot, i) => (<InputSlot {...slot} key={i} />))
            }
            </div>
        )} />
      </div>
    </AuthCard>
  )
}

export default Login