import React from 'react'
import tuvoz from '../assets/img-tuvoz.jpeg'
import nocountry from '../assets/img-nocountry.png'
import Footer from '../components/Footer'

const AboutUs = () => {
  return (
    <div>
      <div className='bg-white py-16 px-6 md:px-12 lg:px-20 text-primary_400'>
        <div className='mb-8 text-center'>
          <h2 className='font-bold mb-10 text-4xl md:text-5xl'>
            Sobre nosotros
          </h2>
          <p className='mb-16 text-lg md:text-xl'>
            En Vocaltech, somos el resultado de una alianza estratégica entre No
            Country y Vos y Tu Voz, uniendo fuerzas para crear un espacio donde
            la comunicación y la tecnología se encuentren al servicio de
            emprendedores y empresas.
          </p>
        </div>

        <div className='flex flex-col w-full'>
          <div className='flex flex-col md:flex-row w-full'>
            <div className='w-full md:w-1/2 bg-gray-200 p-6 md:p-12 lg:p-20 flex flex-col justify-center'>
              <h5 className='text-2xl md:text-3xl font-bold mb-4'>Misión</h5>
              <p className='text-justify text-lg md:text-xl'>
                Apoyar a emprendedores y empresas en su camino al éxito,
                enfocándonos en los pilares fundamentales: comunicación y
                tecnología. A través de un enfoque estratégico y personalizado,
                realizamos diagnósticos que nos permiten identificar necesidades
                específicas y brindar soluciones efectivas que impulsen su
                crecimiento.
              </p>
            </div>
            <img
              className='w-full md:w-1/2 object-cover h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px]'
              src={tuvoz}
              alt='Tu Voz'
            />
          </div>

          <div className='flex flex-col md:flex-row w-full'>
            <img
              className='w-full md:w-1/2 object-cover h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px]'
              src={nocountry}
              alt='No Country'
            />
            <div className='w-full md:w-1/2 bg-gray-200 p-6 md:p-12 lg:p-20 flex flex-col justify-center'>
              <h5 className='text-2xl md:text-3xl font-bold mb-4'>Visión</h5>
              <p className='text-justify text-lg md:text-xl'>
                Creemos en el poder del conocimiento y la colaboración para
                construir un futuro innovador y dinámico. Queremos empoderar a
                todos nuestros leads, difundiendo oportunidades y fortaleciendo
                el poder de la voz para impactar positivamente en la comunidad
                global.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AboutUs
