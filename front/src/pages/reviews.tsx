import React, { useEffect, useState } from 'react'
import Review from '../components/Review-Card'

const reviewsData = [
  {
    rating: 5,
    text: '"El servicio fue excelente, el equipo superó nuestras expectativas. Volveremos a trabajar con ellos."',
    name: 'María López',
    role: 'CEO & Founder'
  },
  {
    rating: 5,
    text: '"Muy buena experiencia, estoy encantada con el servicio prestado. Sin duda, lo recomiendo al 100%"',
    name: 'Carlos Gómez',
    role: 'Project Manager'
  },
  {
    rating: 5,
    text: '"He mejorado mucho, entendieron nuestras necesidades y ofrecieron la mejor solución."',
    name: 'Ana Martínez',
    role: 'Marketing Specialist'
  }
]

const Reviews = (props:any) => {
  const allReviews = [...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData];
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        const nextPosition = prev - 1;
        if (nextPosition <= -(reviewsData.length * 2)) {
          return -reviewsData.length;
        }
        return nextPosition;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='my-10'>
      <h3 className='font-bold text-primary_400 text-3xl text-center mb-12'>
{props.title}
      </h3>
      <div className='overflow-hidden'>
        <div 
          className='flex gap-6 transition-transform duration-1000 ease-linear'
          style={{ 
            transform: `translateX(${position * 33.33}%)`,
            marginLeft: '0'
          }}
        >
          {allReviews.map((review, index) => (
            <div 
              key={index} 
              className='flex-shrink-0'
              style={{ width: 'calc(33.33% - 1rem)' }}
            >
              <Review {...review} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews