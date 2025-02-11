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
      <div className='lg:py-32 flex flex-col lg:flex-row items-center justify-center gap-12 px-8 md:py-20 py-12'>
        <div className='relative w-full max-w-lg'>
          <div className='absolute top-0 left-0 w-full h-full -z-10'>
            <div className='absolute -top-20 left-0 w-full h-[70%] bg-blue-800 blur-[80px] opacity-70'></div>
            <div className='absolute -bottom-20 left-0 w-full h-[60%] bg-orange-500 blur-[80px] opacity-70'></div>
          </div>
          <img
            src='./home.png'
            alt='logo'
            className='w-full object-cover rounded-xl shadow-lg'
          />
        </div>
        <div className='text-black max-w-xl px-6 lg:px-0'>
          <h1 className='text-4xl text-black lg:text-5xl font-bold my-6 leading-snug text-center'>
            ¿Qué desafíos enfrentan nuestros clientes?
          </h1>
          <p className='text-lg text-black lg:text-xl leading-relaxed text-center'>
            Empresas y emprendedores enfrentan desafíos que límitan su
            comunicación, liderazgo y desarrollo. En VocalTech abordamos
            problemas como comunicación interna ineficaz, liderazgo poco
            inspirador y presentaciones sin impacto en las organizaciones, así
            como inseguridad para presentar ideas, dificultad para estructurar
            pitchs y falta de validación de mercado en emprendedores. Ofrecemos
            soluciones que potencian sus habilidades y fomentan su crecimiento.
          </p>
        </div>
      </div>
      <section id='solution'>
        <Solution />
      </section>
      <section id='reviews'>
        <Review />
      </section>
      <section id='about-us'>
        <AboutUs />
      </section>
      <section id='questions'>
        <Questions />
      </section>
      <section id='footer'>
        <Footer />
      </section>
    </div>
  )
}

export default Home
