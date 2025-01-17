import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface RegisterFormInputs {
  name: string
  surname: string
  email: string
  password: string
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log('Datos del formulario:', data)
  }

  return (
    <div className='flex h-screen bg-azul'>
      <section className='w-1/2 bg-anaranjado flex items-center justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full px-16 max-w-4xl'
        >
          <div className='flex gap-8 mb-6'>
            <div className='flex-1'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-white mb-1'
              >
                Nombre
              </label>
              <input
                type='text'
                id='name'
                {...register('name', { required: 'El nombre es obligatorio' })}
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder='Tu nombre'
              />
              {errors.name && (
                <p className='text-grey text-sm mt-1'>{errors.name.message}</p>
              )}
            </div>

            <div className='flex-1'>
              <label
                htmlFor='surname'
                className='block text-sm font-medium text-white mb-1'
              >
                Apellido
              </label>
              <input
                type='text'
                id='surname'
                {...register('surname', {
                  required: 'El apellido es obligatorio'
                })}
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.surname ? 'border-red-500' : 'border-gray-300'
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder='Tu apellido'
              />
              {errors.surname && (
                <p className='text-grey text-sm mt-1'>
                  {errors.surname.message}
                </p>
              )}
            </div>
          </div>

          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-white mb-1'
            >
              E-mail
            </label>
            <input
              type='email'
              id='email'
              {...register('email', {
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'El correo electrónico no es válido'
                }
              })}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:ring-orange-500 focus:border-orange-500`}
              placeholder='ejemplo@gmail.com'
            />
            {errors.email && (
              <p className='text-grey text-sm mt-1'>{errors.email.message}</p>
            )}
          </div>

          <div className='mb-6 relative'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-white mb-1'
            >
              Contraseña
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })}
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:ring-orange-500 focus:border-orange-500`}
                placeholder='********'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-3 flex items-center'
              >
                {showPassword ? (
                  <FiEyeOff
                    className='text-gray-500 hover:text-gray-700'
                    size={20}
                  />
                ) : (
                  <FiEye
                    className='text-gray-500 hover:text-gray-700'
                    size={20}
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-grey text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            className='bg-azul w-full text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition'
          >
            Registrarme
          </button>

          <div className='flex items-center my-6'>
            <div className='flex-grow h-px bg-white'></div>
            <span className='px-4 text-white font-bold text-lg'>O</span>
            <div className='flex-grow h-px bg-white'></div>
          </div>

          <div className='flex justify-center'>
            <button className='flex items-center gap-4 w-full justify-center bg-white text-gray-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition'>
              <img src='./logo_google.png' alt='Google' className='w-5' />
              Registrarme con Google
            </button>
          </div>
        </form>
      </section>

      <section
        className='w-1/2 flex flex-col justify-center items-center gap-40 text-white p-10 relative'
        style={{
          backgroundImage: `url('./fondo-azul.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Link to='/'>
          <img
            src='./logo.png'
            alt='Icono'
            className='absolute top-5 left-5 w-100'
          />
        </Link>
        <div className='text-center'>
          <h1 className='text-5xl font-bold mb-20'>Regístrate</h1>
          <p className='text-lg mb-20'>
            Accede a tu cuenta para aprovechar al máximo nuestras herramientas y
            servicios diseñados para potenciar tus habilidades y conectar
            oportunidades.
          </p>
          <button className='bg-anaranjado px-24 py-3 mt-10 rounded-md text-white hover:bg-blue-700 transition'>
            Iniciar sesión
          </button>
        </div>
      </section>
    </div>
  )
}

export default Register
