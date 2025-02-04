import React from 'react'
import { FaStar } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

interface ReviewProps {
  rating: number
  text: string
  name: string
  role: string
}

const Review: React.FC<ReviewProps> = ({ rating, text, name, role }) => {
  return (
    <div className='bg-azul_card text-white flex flex-col my-3 w-full sm:w-full lg:w-1/3 p-3 sm:p-6 lg:p-6'>
      <div className='flex text-yellow-400'>
        {Array.from({ length: rating }, (_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <p className='my-4'>{text}</p>
      <div className='flex items-center'>
        <CgProfile className='text-5xl mr-2 text-white' />
        <div className='flex flex-col'>
          <p className='font-semibold'>{name}</p>
          <p className='font-extralight text-slate-400 text-xs mt-0'>{role}</p>
        </div>
      </div>
    </div>
  )
}

export default Review
