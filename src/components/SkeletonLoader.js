import { Skeleton } from '@mantine/core';
import React from 'react'

const SkeletonLoader = ({ rows = 10 }) => {
  return (Array.from({ length: rows }).map((x, i) => (
    <Skeleton width={"100%"} height={65} radius='sm' key={i} />
  ))
  )
}

export default SkeletonLoader