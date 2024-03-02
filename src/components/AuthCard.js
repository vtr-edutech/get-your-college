import React from 'react'

const AuthCard = ({ children }) => {
  return (
    <div className='flex flex-col justify-center items-center p-6 bg-card rounded outline-1 outline-gray-50'>
        {children}
    </div>
  )
}

export default AuthCard