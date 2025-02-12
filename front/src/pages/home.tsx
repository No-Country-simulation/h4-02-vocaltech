import '../index.css'
import Review from '../pages/reviews'
import Footer from '../components/Footer'
import Ready from '../components/Ready'
import CTA from '../components/CTA'
import Brands from '../components/Brands'
import Carrousel from '../components/Carrousel'
import Solution from './solution'
import Contact from './contact'

const Home = () => {
  return (
    <div className='bg-blanco_300'>
      <div className='relative w-full mx-auto min-h-[400px]'>
        <Carrousel />
      </div>
      <section id='ready'>
        <Ready />
      </section>
      <section id='servicios'>
        <Solution />
      </section>
      <section id='brands'>
        <Brands />
      </section>
      <section id='reviews' className='my-24'>
        <Review title='¿Qué dicen nuestros clientes?' />
      </section>
      <section id='cta'>
        <CTA
          title='Estas ansioso por que trabajemos juntos?'
          button='Regístrate'
        />
      </section>
      <section id='contact'>
        <Contact />
      </section>
      <section id='footer'>
        <Footer />
      </section>
    </div>
  )
}

export default Home
