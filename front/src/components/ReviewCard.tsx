import React from 'react'

type ReviewCardProps = {
  name: string
  description: string
  color: string
  image: string
  bg: string
  small?: boolean
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  description,
  image,
  bg,
  color,
  small = false
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row ${bg} rounded-xl overflow-hidden shadow-md ${
        small ? 'max-w-xs mx-auto sm:max-w-none' : ''
      }`}
    >
      <div className='w-full sm:w-1/4 p-4 flex justify-center items-center'>
        <img
          src={image}
          alt={name}
          className='w-20 h-20 object-cover rounded-full'
        />
      </div>
      <div
        className={`w-full sm:w-3/4 p-4 flex flex-col justify-center text-center sm:text-left`}
      >
        <h4 className={`text-xl font-bold mb-2 ${color}`}>{name}</h4>
        <p className={`text-md leading-snug ${color}`}>{description}</p>
      </div>
    </div>
  )
}

export default ReviewCard
