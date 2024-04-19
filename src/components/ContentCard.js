import React from 'react'

const ContentCard = ({ children }) => {
  return (
    <div className='flex flex-col w-full rounded-md bg-white shadow p-8 gap-3 md:mb-10'>
        {children}
    </div>
  )
}

export default ContentCard