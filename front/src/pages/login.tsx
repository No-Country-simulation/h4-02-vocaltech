import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'

interface LoginFormInputs {
  email: string
  password: string
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>()

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('Datos del formulario:', data)
  }

  return (
    <div className='flex h-screen bg-anaranjado'>
      <section
        className='w-1/2 flex flex-col justify-center items-center gap-16 text-white p-10'
        style={{
          backgroundImage: `url('./fondo-naranja.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='text-center'>
          <h1 className='text-5xl font-bold mb-20'>
            Inicia sesión en VocalTech
          </h1>
          <p className='text-lg mb-20'>
            Accede a tu cuenta para aprovechar al máximo nuestras herramientas y
            servicios diseñados para potenciar tus habilidades y conectar
            oportunidades.
          </p>
          <Link to='/register'>
            <button className='bg-azul px-6 py-3 rounded-md text-white hover:bg-blue-700 transition'>
              Registrarme
            </button>
          </Link>
        </div>
      </section>

      <section className='w-1/2 bg-azul flex items-center justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='text-white w-3/4 max-w-3xl'
        >
          <div className='mb-6'>
            <label htmlFor='email' className='block text-lg font-medium'>
              E-mail
            </label>
            <input
              type='email'
              id='email'
              className='w-full border-gray-300 text-black rounded-lg px-3 py-2 mt-1 focus:ring-orange-500 focus:border-orange-500'
              placeholder='ejemplo@gmail.com'
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Introduce un email válido'
                }
              })}
            />
            {errors.email && (
              <span className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className='mb-10'>
            <label htmlFor='password' className='block text-lg font-medium '>
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              className='w-full border-gray-300 text-black rounded-lg px-3 py-2 mt-1 focus:ring-orange-500 focus:border-orange-500'
              placeholder='********'
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
            />
            {errors.password && (
              <span className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type='submit'
            className='bg-orange-500 w-full text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition'
          >
            Iniciar sesión
          </button>

          <div className='flex items-center my-6'>
            <div className='flex-grow h-px bg-gray-300'></div>
            <span className='px-4 text-gray-300 font-bold text-lg'>O</span>
            <div className='flex-grow h-px bg-gray-300'></div>
          </div>

          <div className='flex gap-4 justify-center'>
            <button className='flex items-center gap-2 bg-white text-black py-2 px-4 rounded-lg w-1/2 justify-center hover:bg-gray-200 transition'>
              <img src='./logo_google.png' alt='Google' className='w-5' />
              Iniciar con Google
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login
