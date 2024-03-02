import AuthCard from '@/components/AuthCard'
import { PROJECT_NAME_TITLE_CASE } from '@/constants'
import React from 'react'

export const metadata = {
  title: `Login to continue | ${PROJECT_NAME_TITLE_CASE}`
}

const Login = () => {
  return (
    <AuthCard>
      hi!
    </AuthCard>
  )
}

export default Login