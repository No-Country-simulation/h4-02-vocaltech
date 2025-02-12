import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

interface LoginFormInputs {
  email: string
  password: string
}

interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>()

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true)
    setLoginError(null)

    try {
      const response = await api.post('/auth/login', data)
      const { token, id } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('id', id)
      login(token, id)
      toast.success('Inicio de sesión exitoso')
      navigate('/')
    } catch (err) {
      const error = err as ApiError
      setLoginError(
        error.response?.data?.message || 'Ocurrió un error al iniciar sesión'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen bg-anaranjado'>
      <div className='lg:hidden absolute top-5 left-5 right-5 flex justify-between z-10'>
        <Link to='/'>
          <img
            src='./logo.png'
            alt='Icono'
            className='absolute top-5 left-10 w-130'
          />
        </Link>
        <Link to='/register'>
          <button className='bg-orange-500 absolute top-5 right-10 px-10 py-2 rounded-md text-white hover:bg-anaranjado transition'>
            Registrarme
          </button>
        </Link>
      </div>
      <section
        className='hidden lg:flex lg:w-1/2 flex-col justify-center items-center gap-16 text-white p-10'
        style={{
          backgroundImage: `url('./fondo-naranja.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Link to='/'>
          <img
            src='./logo.png'
            alt='Icono'
            className='absolute top-5 left-10 w-130'
          />
        </Link>
        <div className='text-center'>
          <h1 className='text-5xl font-bold mb-20'>
            Inicia sesión en VocalTech
          </h1>
          <p className='text-lg mb-20'>
            Accede a tu cuenta para aprovechar al máximo nuestras herramientas y
            servicios.
          </p>
          <Link to='/register'>
            <button className='bg-[#0B1455] px-20 py-3 rounded-md text-white hover:bg-blue-700 transition'>
              Registrarme
            </button>
          </Link>
        </div>
      </section>

      <section className='flex flex-1 lg:w-1/2 bg-[#0B1455] items-center justify-center relative'>
        <div className='text-white w-3/4 max-w-3xl'>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <label htmlFor='password' className='block text-lg font-medium'>
                Contraseña
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
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
                <span className='text-red-500 text-sm mt-1'>
                  {errors.password.message}
                </span>
              )}

              <div className='text-right mt-2'>
                <Link
                  to='/ForgotPassword'
                  className='text-white underline text-sm'
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {loginError && (
              <div className='text-red-500 text-sm mb-4'>{loginError}</div>
            )}

            <button
              type='submit'
              disabled={isLoading}
              className='bg-orange-500 w-full text-white py-3 mt-10 rounded-lg font-semibold hover:bg-orange-600 transition'
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className='flex items-center my-6'>
            <div className='flex-grow h-px bg-white'></div>
            <span className='px-4 text-white font-bold text-lg'>O</span>
            <div className='flex-grow h-px bg-white'></div>
          </div>

          <div className='flex justify-center'>
            <Link to='https://h4-02-vocaltech.onrender.com/auth'>
              <button className='flex items-center gap-4 w-full justify-center bg-white text-gray-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition'>
                <img src='./logo_google.png' alt='Google' className='w-5' />
                Registrarme con Google
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
