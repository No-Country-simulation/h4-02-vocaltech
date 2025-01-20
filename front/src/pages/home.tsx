import React from 'react'
import '../index.css'
import Solution from './solution'
import Review from '../pages/reviews'
import AboutUs from '../pages/aboutUs'
import Questions from '../pages/questions'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <div className='bg-azul py-40 flex items-center justify-center gap-10 px-15'>
        <div className='px-10'>
          <img
            src='./voz.webp'
            alt='logo'
            className='w-full max-w-lg object-cover rounded-xl'
          />
        </div>
        <div className='text-white pb-10 max-w-xl'>
          <h1 className='text-5xl pb-3 font-bold my-4'>
            ¿Qué desafíos enfrentan nuestros clientes?
          </h1>
          <p className='text-xl'>
            Empresas y emprendedores enfrentan desafíos que límitan su
            comunicación, liderazgo y desarrollo. En VocalTech abordamos
            problemas como comunicación interna ineficaz. liderazgo poco
            inspirador y presentaciones sin impacto en las organizaciones, así
            como inseguridad para presentar ideas, dificultad para estructurar
            pitchs y falta de validación de mercado en emprendedores. Ofrecemos
            soluciones que potencian sus habilidades y fomentan su crecimiento.
          </p>
        </div>
      </div>

      <section id='solution' className='bg-gray-100'>
        <Solution />
      </section>
      <section id='reviews'>
        <Review />
      </section>
      <section id='about-us'>
        <AboutUs />
      </section>
      <section id='questions' className=' bg-white'>
        <Questions />
      </section>
      <section id='footer' className=' bg-white'>
        <Footer />
      </section>
    </div>
  )
}

export default Home
