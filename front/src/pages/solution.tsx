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
      <div className='text-center'>
        <h3 className='text-4xl font-bold text-black mb-4'>
          Nuestros servicios
        </h3>
        <p className='text-lg text-slate-700 mx-auto max-w-4xl mb-4'>
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
          className='bg-blue-950 w-full'
        />
        <Card
          title='De idea a acción'
          text='Impulsamos tu negocio digital, ayudándote a integrar equipos diversos que ejecuten tu visión de manera ágil y eficiente.'
          className='bg-blue-950 w-full'
        />
        <Card
          title='Comunicación con propósito'
          text='Desarrolla un MVP funcional mientras fortaleces tus habilidades y conectas con oportunidades a través de nuestra red.'
          className='bg-blue-950 w-full'
        />
      </div>
    </>
  )
}

export default Solution
