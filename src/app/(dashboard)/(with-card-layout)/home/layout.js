import { PROJECT_NAME_TITLE_CASE } from '@/constants'
import React from 'react'

export const metadata = {
    title: 'Search with cutoff / rank | ' + PROJECT_NAME_TITLE_CASE
}

const Layout = ({children}) => {
  return (
    <>
        {children}
    </>
  )
}

export default Layout