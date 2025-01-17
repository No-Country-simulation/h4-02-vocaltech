import React from 'react'
import '../index.css'
import Solution from './solution'
import Review from '../components/Review'
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
          <h1 className='text-6xl pb-3 font-bold my-4'>
            Lorem Ipsum simply dummy
          </h1>
          <p className='text-xl'>
            Welcome to Burger Bliss, where we take your cravings to a whole new
            level! Our mouthwatering burgers are made from 100% beef and are
            served on freshly baked buns.
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
