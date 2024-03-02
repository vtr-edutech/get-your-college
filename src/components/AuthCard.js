import React from 'react'

const AuthCard = ({ gap, children }) => {
  return (
    <div className={`flex flex-col justify-center ${gap ? `gap-${gap}`: 'gap-10'} p-6 bg-card rounded outline-1 shadow-sm shadow-black/10 outline-gray-50`}>
        {children}
    </div>
  )
}

export default AuthCard