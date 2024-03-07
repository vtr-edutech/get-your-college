import React from 'react'
import { Navbar } from './Navbar/Navbar'
import { cookies } from 'next/headers'
import { verifyJWT } from '@/utils'

const ServerNav = async () => {
  /* getting userName from verifying JWT again because :
    1. cant read req object in server component
    2. can read headers, but dont know if setting custom header with user's name is a security concern or not
  */
  const userName = 'User';
  // console.log("🚀 ~ ServerNav ~ userName:", userName?.sub?.name);
  return (
    <>
        <Navbar userName={userName} />
    </>
  )
}

export default ServerNav