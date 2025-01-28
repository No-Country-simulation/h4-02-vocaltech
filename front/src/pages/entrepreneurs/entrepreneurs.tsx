import React from 'react'
import FeedbackCard from '../../components/ReviewCard'
import Card from '../../components/Card'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

const entrepreneurs = () => {
  type CardProps = {
    title: string
    text: string
    className?: string
  }
  return (
    <div>
      <div className='flex flex-col lg:gap-10 lg:mx-6 lg:flex-row items-center justify-between py-10 lg:py-20 px-6 lg:px-20'>
        <div className='text-column flex flex-col justify-center w-full lg:w-1/2 mb-8 lg:mb-0'>
          <h1 className='font-bold text-3xl mb-6 md:text-4xl lg:text-5xl lg:leading-[1.3]'>
            Empodera a los emprendedores con{' '}
            <span className='text-anaranjado'>VocalTech</span>
          </h1>
          <p className='text-left text-lg leading-relaxed lg:text-xl'>
            Los emprendedores enfrentan obstáculos que limitan su éxito, como la
            inseguridad al presentar ideas y la dificultad para estructurar
            pitchs convincentes que atraigan clientes e inversores. La falta de
            habilidades en storytelling y comunicación efectiva reduce su
            capacidad para conectar con el público. Además, carecen de acceso a
            recursos clave para validar sus ideas en el mercado y construir MVPs
            funcionales, enfrentándose a altos costos, tiempos prolongados y
            riesgos en el desarrollo. Estos desafíos dificultan transformar sus
            ideas en negocios sostenibles y competitivos.
          </p>
        </div>

        <div className='relative w-full lg:w-1/2'>
          <div className='image-column flex justify-center'>
            <img
              className='w-full object-cover'
              src='./img_entrepreneurs.png'
              alt='Imagen de emprendedor'
            />
          </div>
          <div className='absolute bottom-0 left-0 w-full h-[30%] bg-orange-400 blur-[60px] opacity-80 z-[-1]'></div>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center px-10'>
        <h4 className='font-bold text-center mb-12 text-3xl'>
          Nuestra solución
        </h4>
        <p className='text-justify text-lg lg:text-xl'>
          Descubre cómo los servicios de VocalTech pueden ayudarte a superar los
          desafíos que enfrentan los emprendedores.
        </p>
      </div>
      <div className='cards flex flex-col items-center justify-around mx-10 my-9 pb-10 md:flex-row md:items-stretch'>
        <Card
          title='Entrenamiento personalizado'
          text='Sesiones a medida para perfeccionar tus habilidades de oratoria y storytelling.
Ideal para presentaciones de pitch y captación de inversores.'
          className='bg-gradient-to-r from-[#28023C] to-[#0B0120]'
        />
        <Card
          title='Coaching individual'
          text='Comunicación efectiva que impulse tu negocio.
        Sesiones personalizadas enfocadas en storytelling, pitch y liderazgo vocal.'
          className='bg-gradient-to-r from-[#003741] to-[#000B1E]'
        />
        <Card
          title='Validación de Mercado'
          text='Obtén retroalimentación y valida tu idea en una comunidad de 30,000 miembros.'
          className='bg-gradient-to-r from-[#28023C] to-[#0B0120]'
        />

        <Card
          title='Equipos Tech Validados'
          text='Colabora con talento junior productivo para el desarrollo de tu MVP.'
          className='bg-gradient-to-r from-[#003741] to-[#000B1E]'
        />
        <Card
          title='Reducción de Riesgos'
          text='Minimiza costos y tiempos en el desarrollo de tu idea.'
          className='bg-gradient-to-r from-[#28023C] to-[#0B0120]'
        />
      </div>
      <div className='flex flex-col justify-center items-center p-10'>
        <h4 className='font-bold text-center text-2xl mb-12 md:text-3xl'>
          Testimonios de Emprendedores
        </h4>
        <p className='text-justify text-lg lg:text-xl'>
          Descubre lo que dicen los emprendedores que han utilizado los
          servicios de VocalTech para impulsar sus proyectos.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-20'>
          <FeedbackCard
            name='John Doe'
            description='El impacto de los programas de VocalTech en nuestra empresa ha sido increíble. Nos ayudaron a mejorar nuestra comunicación y liderazgo de manera notable.'
            image='./perfil.png'
            color='text-black'
            bg='bg-gray-400'
          />
          <FeedbackCard
            name='Jane Smith'
            description='Trabajar con VocalTech nos dio herramientas valiosas para fortalecer nuestra cultura corporativa y optimizar el desempeño de nuestros equipos.'
            image='./perfil.png'
            color='text-black'
            bg='bg-gray-400'
          />
          <FeedbackCard
            name='Robert Brown'
            description='VocalTech nos ayudó a redefinir nuestra estrategia de comunicación y mejorar las relaciones con nuestros clientes.'
            image='./perfil.png'
            color='text-black'
            bg='bg-gray-400'
          />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center px-20 pb-10 lg:px-40 lg:pb-20'>
        <h3 className='font-bold text-center text-2xl mb-12 md:text-4xl'>
          ¡Potencia tu emprendimiento con VocalTech!
        </h3>
        <button className='bg-anaranjado px-5 py-2 rounded text-white hover:brightness-110 transition'>
          Registrarse
        </button>
      </div>
      <div className='bg-azul_claro'>
        <Footer />
      </div>
    </div>
  )
}

export default entrepreneurs
