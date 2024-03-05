import React from 'react'

const ContentCard = ({ children }) => {
  return (
    <div className='flex flex-col w-full rounded-md bg-slate-50 shadow p-8'>
        {children}
    </div>
  )
}

export default ContentCard