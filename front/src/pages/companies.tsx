import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import ReviewCard from '../components/ReviewCard'
import DiagnosticButton from '../components/DiagnosticButton'

const Companies = () => {
  return (
    <div>
      <section
        className='bg-cover bg-center h-screen flex flex-col justify-center items-center gap-10 p-6 sm:gap-12 sm:p-12 md:gap-16 md:p-16 lg:gap-20 lg:p-20 xl:gap-24 xl:p-24'
        style={{
          backgroundImage: `url('companies.png')`
        }}
      >
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-center text-white drop-shadow-[0_0_8px_rgba(0,0,0,1)] leading-tight'>
          Transforma la Comunicación y Liderazgo empresarial con{' '}
          <span className='text-anaranjado'>VocalTech</span>
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
        <DiagnosticButton />
      </section>

      <section className='bg-white py-12 px-4 sm:px-12 md:px-20 lg:px-32'>
        <div className='text-center mb-8'>
          <h3 className='text-3xl py-6 md:text-4xl font-bold text-black mb-4'>
            Nuestra solución
          </h3>
          <p className='text-slate-500 text-lg md:text-xl leading-relaxed'>
            Descubre cómo VocalTech puede transformar la comunicación y
            liderazgo empresarial con sus servicios especializados.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'>
          <Card
            title='Liderar a través de la voz'
            text='Curso para empresas y profesionales de todas las jerarquías.
            Transforma la comunicación y el liderazgo a través del poder de la voz.'
            className='bg-blue-700'
          />
          <Card
            title='Capacitaciones para empresas'
            text='Programas diseñados para mejorar la comunicación interna y externa. Fortalece el liderazgo en equipos y el impacto en reuniones o presentaciones.'
            className='bg-blue-700'
          />
          <Card
            title='Fortalecer la voz de la empresa'
            text='Programa para empresas familiares. Mejora la cohesión y comunicación interna, alineando visión y valores para reflejar unidad y liderazgo.'
            className='bg-blue-700'
          />
          <Card
            title='Charlas inspiradoras'
            text='Programas diseñados para mejorar la comunicación interna y externa. Fortalece el liderazgo en equipos y el impacto en reuniones o presentaciones.'
            className='bg-blue-700'
          />
          <Card
            title='Validación de Mercado'
            text='Prueba y ajusta tus ideas en una comunidad activa de más de 30,000 miembros.'
            className='bg-blue-700'
          />
          <Card
            title='Equipos Tech Validados'
            text='Equipos junior productivos validados mediante simulaciones laborales. Ideal para reducir costos y asegurar la calidad en desarrollos tecnológicos.'
            className='bg-blue-700'
          />
          <Card
            title='Reducción de Riesgos'
            text='Optimiza costos, tiempos de desarrollo y riesgos asociados con la creación de MVPs.'
            className='bg-blue-700'
          />
          <Card
            title='Talento Liberado'
            text='Talento validado culturalmente listo para contratación después del MVP.'
            className='bg-blue-700'
          />
        </div>
      </section>

      <section className='bg-white py-12 px-4 sm:px-12 md:px-20 lg:px-32'>
        <div className='text-center mb-8'>
          <h3 className='text-3xl py-6 md:text-5xl font-bold text-black mb-4'>
            Testimonios de Clientes Satisfechos
          </h3>
          <p className='text-slate-500 text-lg md:text-xl leading-relaxed'>
            Descubre lo que nuestros clientes tienen que decir sobre cómo
            VocalTech ha transformado sus empresas y liderazgo empresarial.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center'>
          <ReviewCard
            name='John Doe'
            description='El impacto de los programas de VocalTech en nuestra empresa ha sido increíble. Nos ayudaron a mejorar nuestra comunicación y liderazgo de manera notable.'
            image='./perfil.png'
            color='text-black'
            bg='bg-gray-400'
          />
          <ReviewCard
            name='Jane Smith'
            description='Trabajar con VocalTech nos dio herramientas valiosas para fortalecer nuestra cultura corporativa y optimizar el desempeño de nuestros equipos.'
            image='./perfil.png'
            color='text-black'
            bg='bg-gray-400'
          />
        </div>

        <div className='flex justify-center pt-6'>
          <ReviewCard
            name='Robert Brown'
            description='VocalTech nos ayudó a redefinir nuestra estrategia de comunicación y mejorar las relaciones con nuestros clientes.'
            image='./perfil.png'
            color='text-black'
            bg='bg-gray-400'
          />
        </div>
      </section>

      <section className='bg-white py-12 px-4 sm:px-12 md:px-20 lg:px-32'>
        <div className='text-center mb-8'>
          <h3 className='text-3xl py-6 md:text-5xl font-bold text-black mb-4'>
            Transforma la comunicación y liderazgo empresarial con VocalTech
          </h3>
          <Link to='/register'>
            <button className='bg-anaranjado w-60 text-white py-2 mt-8 rounded-lg font-semibold hover:bg-orange-700 transition'>
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
