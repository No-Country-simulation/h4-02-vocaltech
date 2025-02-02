import React from 'react'
import '../App.css'

type CardProps = {
  title: string
  text: string
  className?: string
}

const Card: React.FC<CardProps> = ({ title, text, className }) => {
  return (
    <div className='card-container w-full sm:w-2/6 lg:m-2'>
      <div className='card-animation'>
        {/* Frente de la tarjeta */}
        <div
          className={`card-front ${className} flex flex-col p-5 bg-blue-700 text-white rounded-xl justify-center items-center text-center`}
        >
          <h4 className='font-bold text-white text-3xl mb-7 mt-3'>{title}</h4>
        </div>
        {/* Reverso de la tarjeta */}
        <div
          className={`card-back ${className} flex flex-col p-5 bg-blue-700 text-white rounded-xl text-center  justify-center items-center`}
        >
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
