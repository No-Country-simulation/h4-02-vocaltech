import React from 'react'
import Review from '../components/Review-Card'

const reviewsData = [
  {
    rating: 5,
    text: '“El servicio fue excelente, el equipo superó nuestras expectativas. Volveremos a trabajar con ellos.”',
    name: 'María López',
    role: 'CEO & Founder'
  },
  {
    rating: 5,
    text: '“Muy buena experiencia, estoy encantada con el servicio prestado. Sin duda, lo recomiendo al 100%”',
    name: 'Carlos Gómez',
    role: 'Project Manager'
  },
  {
    rating: 5,
    text: '“He mejorado mucho, entendieron nuestras necesidades y ofrecieron la mejor solución.”',
    name: 'Ana Martínez',
    role: 'Marketing Specialist'
  }
]

const Reviews = () => {
  return (
    <div className='my-24'>
      <h3 className='font-bold text-black text-3xl text-center mb-4'>
        ¿Qué dicen nuestros clientes?
      </h3>
      <div className='flex flex-col px-4 sm:space-y-4 sm:px-6 sm:mx-28 lg:flex-row lg:space-y-0 lg:space-x-6 lg:px-40 items-center'>
        {reviewsData.map((review, index) => (
          <Review key={index} {...review} />
        ))}
      </div>
    </div>
  )
}

export default Reviews
