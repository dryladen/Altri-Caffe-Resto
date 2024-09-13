import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ButtonSkeleton = () => {
  return (
    <div className="flex">
      <Skeleton className="w-24 h-10" />
    </div>
  )
}

export default ButtonSkeleton