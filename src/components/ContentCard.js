import React from 'react'

const ContentCard = ({ children }) => {
  return (
    <div className='flex flex-col w-full rounded-md bg-white shadow md:p-8 p-5 gap-3 md:mb-10'>
        {children}
    </div>
  )
}

export default ContentCard