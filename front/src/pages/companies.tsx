import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Companies = () => {
  return (
    <div>
      <section
        className='bg-cover bg-center h-screen flex flex-col justify-center items-center gap-10 p-6 sm:gap-12 sm:p-12 md:gap-16 md:p-16 lg:gap-20 lg:p-20 xl:gap-24 xl:p-24'
        style={{
          backgroundImage: `url('header_companies.png')`
        }}
      >
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-center text-white drop-shadow-[0_0_8px_rgba(0,0,0,1)] leading-tight'>
          Transforma la Comunicación y Liderazgo empresarial con VocalTech
        </h2>
        <p className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-center text-white drop-shadow-[0_0_5px_rgba(0,0,0,1)] leading-relaxed'>
          Las empresas enfrentan desafíos clave que afectan su crecimiento y
          efectividad. Problemas como la comunicación interna deficiente, el
          liderazgo poco inspirador y las presentaciones sin impacto limitan su
          capacidad para conectar con equipos y clientes. Las empresas
          familiares a menudo luchan con la falta de cohesión y visión
          unificada, mientras que las organizaciones innovadoras enfrentan altos
          costos, riesgos y procesos tecnológicos ineficientes al desarrollar
          proyectos. Además, la falta de talento validado y programas
          motivacionales efectivos reduce la productividad y la cultura
          corporativa. Estos obstáculos impactan la capacidad de proyectar
          liderazgo, aprovechar oportunidades y fortalecer su marca.
        </p>
      </section>
      <section className='bg-white py-16 px-6 sm:px-12 md:px-20 lg:px-32'>
        <div className='text-center mb-12'>
          <h3 className='text-3xl py-10 md:text-4xl font-bold text-black mb-4'>
            Nuestra solución
          </h3>
          <p className='text-slate-500 pb-20 text-lg md:text-xl leading-relaxed'>
            Descubre cómo VocalTech puede transformar la comunicación y
            liderazgo empresarial con sus servicios especializados.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='aspect-w-4 aspect-h-3 bg-gray-200 rounded-xl overflow-hidden shadow-md'>
            <img
              src='./fondo-azul.png'
              alt='Placeholder 1'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='aspect-w-4 aspect-h-3 bg-gray-200 rounded-xl overflow-hidden shadow-md'>
            <img
              src='./fondo-naranja.png'
              alt='Placeholder 1'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='aspect-w-4 aspect-h-3 bg-gray-200 rounded-xl overflow-hidden shadow-md'>
            <img
              src='./header_companies.png'
              alt='Placeholder 1'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='aspect-w-4 aspect-h-3 bg-gray-200 rounded-xl overflow-hidden shadow-md'>
            <img
              src='./fondo-naranja.png'
              alt='Placeholder 1'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='aspect-w-4 aspect-h-3 bg-gray-200 rounded-xl overflow-hidden shadow-md'>
            <img
              src='./fondo-naranja.png'
              alt='Placeholder 1'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='aspect-w-4 aspect-h-3 bg-gray-200 rounded-xl overflow-hidden shadow-md'>
            <img
              src='./fondo-naranja.png'
              alt='Placeholder 1'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </section>
      <section className='bg-white py-16 px-6 sm:px-12 md:px-20 lg:px-32'>
        <div className='text-center mb-12'>
          <h3 className='text-3xl py-10 md:text-5xl font-bold text-black mb-4'>
            Transforma la comunicación y liderazgo empresarial con VocalTech
          </h3>
          <Link to='/register'>
            <button className='bg-anaranjado w-60 text-white py-2 mt-10 rounded-lg font-semibold hover:bg-orange-700 transition'>
              Registrarse
            </button>
          </Link>
        </div>
      </section>
      <div className='bg-azul_claro flex items-center justify-center'>
        <Footer />
      </div>
    </div>
  )
}

export default Companies
