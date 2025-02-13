import React from 'react'
import Card from '../components/Card'

const Solution = () => {
  type CardProps = {
    title: string
    text: string
    className?: string
  }

  return (
    <>
      <div className='text-center text-primary_400'>
        <h3 className='text-4xl mt-10 font-bold text-primary_400 mb-4'>
          Nuestros servicios
        </h3>
        <p className='text-lg mx-auto max-w-4xl mb-4'>
          En Vocaltech, entendemos que cada proyecto y negocio tiene necesidades
          únicas. Por eso, ofrecemos soluciones diseñadas para potenciar tu
          comunicación, integrar tecnología de manera efectiva y ayudarte a
          alcanzar tus metas de forma estratégica.
        </p>
      </div>
      <div className='cards flex flex-col items-center justify-around lg:mx-20 lg:pb-10 md:flex-row md:items-stretch'>
        <Card
          title='Entrenamiento vocal efectivo'
          text='Mejora tu habilidad para conectar e inspirar con tu mensaje. Trabajamos en desarrollar empatía y transmitir mensajes convincentes que impulsen tanto el crecimiento individual como grupal en tu negocio.'
          className='bg-secondary_600 w-full'
        />
        <Card
          title='De idea a acción'
          text='Impulsamos tu negocio digital, ayudándote a integrar equipos diversos que ejecuten tu visión de manera ágil y eficiente.'
          className='bg-secondary_600 w-full'
        />
        <Card
          title='Comunicación con propósito'
          text='Desarrolla un MVP funcional mientras fortaleces tus habilidades y conectas con oportunidades a través de nuestra red.'
          className='bg-secondary_600 w-full'
        />
      </div>
    </>
  )
}

export default Solution
