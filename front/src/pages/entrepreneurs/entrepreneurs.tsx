import Card from '../../components/Card'
import Footer from '../../components/Footer'
import DiagnosticButton from '../../components/DiagnosticButton'
import Reviews from '../reviews'
import CTA from '../../components/CTA'

const entrepreneurs = () => {
  type CardProps = {
    title: string
    text: string
    className?: string
  }
  return (
    <div className='bg-white'>
      <div className='flex flex-col bg-white lg:gap-10 lg:flex-row items-center justify-between py-10 lg:py-20 px-6 lg:px-20'>
        <div className='text-column flex flex-col justify-center w-full lg:w-1/2 mb-8 lg:mb-0'>
          <h1 className='font-bold text-primary_400  text-3xl mb-6 md:text-4xl lg:text-5xl lg:leading-[1.3]'>
            Empodera a los emprendedores con{' '}
            <span className='text-secondary_600'>VocalTech</span>
          </h1>
          <p className='text-left text-primary_400  text-lg pb-10 leading-relaxed lg:text-xl'>
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
          <DiagnosticButton />
        </div>
        <div className='bg-white relative w-full lg:w-1/2'>
          <div className='image-column bg-white flex justify-center'>
            <img
              className='w-full object-cover'
              src='./img_entrepreneurs.png'
              alt='Imagen de emprendedor'
            />
          </div>
          <div className='absolute bottom-0 left-0 w-full h-[30%] bg-orange-400 blur-[60px] opacity-80 z-[-1]'></div>
        </div>
      </div>

      <div className='flex flex-col bg-white justify-center items-center px-10'>
        <h4 className='font-bold text-primary_400  text-center mb-12 text-3xl'>
          Nuestra solución
        </h4>
        <p className='text-justify text-primary_400  text-lg lg:text-xl'>
          Descubre cómo los servicios de VocalTech pueden ayudarte a superar los
          desafíos que enfrentan los emprendedores.
        </p>
      </div>
      <div className='bg-white cards flex flex-col items-center justify-around mx-10 my-9 pb-10 md:flex-row md:items-stretch'>
        <Card
          title='Entrenamiento personalizado'
          text='Sesiones a medida para perfeccionar tus habilidades de oratoria y storytelling.
Ideal para presentaciones de pitch y captación de inversores.'
          className='bg-primary_400 px-2'
        />
        <Card
          title='Coaching individual'
          text='Comunicación efectiva que impulse tu negocio.
        Sesiones personalizadas enfocadas en storytelling, pitch y liderazgo vocal.'
          className='bg-primary_400'
        />
        <Card
          title='Validación de Mercado'
          text='Obtén retroalimentación y valida tu idea en una comunidad de 30,000 miembros.'
          className='bg-primary_400'
        />

        <Card
          title='Equipos Tech Validados'
          text='Colabora con talento junior productivo para el desarrollo de tu MVP.'
          className='bg-primary_400'
        />
        <Card
          title='Reducción de Riesgos'
          text='Minimiza costos y tiempos en el desarrollo de tu idea.'
          className='bg-primary_400'
        />
      </div>
      <div className='flex flex-col bg-white justify-center items-center p-10'>
        <h4 className='font-bold text-primary_400  text-center text-2xl mb-12 md:text-3xl'>
          Testimonios de Emprendedores
        </h4>
        <p className='text-justify  text-primary_400 text-lg lg:text-xl'>
          Descubre lo que dicen los emprendedores que han utilizado los
          servicios de VocalTech para impulsar sus proyectos.
        </p>
      </div>
      <Reviews title='' />
      <CTA
        title='¡Potenciá tu emprendimiento con VocalTech!'
        button='Registrarse'
      />
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default entrepreneurs
