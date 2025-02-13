import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'sonner'

interface RegisterFormInputs {
  name: string
  phone: number
  email: string
  password: string
}

interface ApiErrorResponse {
  message?: string
}

const isApiErrorResponse = (
  error: unknown
): error is { response: { data: ApiErrorResponse } } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as { response: unknown }).response === 'object' &&
    'data' in (error as { response: { data: unknown } }).response
  )
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>()

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsLoading(true)
    try {
      const response = await api.post('/auth/register', data)

      toast.success('¡Registro exitoso! Por favor inicia sesión.')
      navigate('/login')
    } catch (error) {
      if (isApiErrorResponse(error)) {
        const errorMessage =
          error.response.data.message ||
          'Hubo un problema en el servidor. Intenta nuevamente.'
        setRegisterError(errorMessage)
      } else {
        setRegisterError('Error de conexión. Por favor verifica tu red.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col lg:flex-row min-h-screen bg-anaranjado'>
      <section className='flex-1 bg-azul_oscuro flex items-center justify-center relative'>
        <div className='absolute top-5 left-5 lg:hidden'>
          <Link to='/'>
            <img src='./logo.png' alt='Logo Home' className='w-40' />
          </Link>
        </div>
        <div className='absolute top-5 right-5 lg:hidden'>
          <Link to='/login'>
            <button className='bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition'>
              Iniciar sesión
            </button>
          </Link>
        </div>

        <div className='w-3/4 max-w-4xl px-6 lg:px-16'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col lg:flex-row gap-6 mb-6'>
              <div className='flex-1'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-white mb-1'
                >
                  Nombre completo
                </label>
                <input
                  type='text'
                  id='name'
                  {...register('name', {
                    required: 'El nombre es obligatorio',
                    pattern: {
                      value: /^[^0-9]*$/,
                      message: 'El nombre no puede contener números'
                    }
                  })}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-orange-500 focus:border-orange-500`}
                  placeholder='Tu nombre'
                />
                {errors.name && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className='flex-1'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-white mb-1'
                >
                  Teléfono
                </label>
                <input
                  type='number'
                  id='phone'
                  {...register('phone', {
                    required: 'El teléfono es obligatorio'
                  })}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-orange-500 focus:border-orange-500`}
                  placeholder='Tu teléfono'
                />
                {errors.phone && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.phone.message}
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
                <p className='text-red-500 text-sm mt-1'>
                  {errors.email.message}
                </p>
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
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        'La contraseña debe contener al menos 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial'
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
                <p className='text-red-500 text-sm mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {registerError && (
              <div className='text-red-500 text-sm mb-4'>{registerError}</div>
            )}

            <button
              type='submit'
              disabled={isLoading}
              className={`bg-anaranjado w-full text-white py-3 rounded-lg font-semibold transition ${
                isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:anaranjado_claro'
              }`}
            >
              {isLoading ? 'Realizando registro...' : 'Registrarme'}
            </button>

            <div className='flex items-center my-6'>
              <div className='flex-grow h-px bg-white'></div>
              <span className='px-4 text-white font-bold text-lg'>O</span>
              <div className='flex-grow h-px bg-white'></div>
            </div>
          </form>

          <div className='flex justify-center'>
            <Link to='https://h4-02-vocaltech.onrender.com/Oauth'>
              <button className='flex items-center gap-4 w-full justify-center bg-white text-gray-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition'>
                <img src='./logo_google.png' alt='Google' className='w-5' />
                Registrarme con Google
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section
        className='flex-1 hidden lg:flex flex-col justify-center items-center gap-40 text-white p-10 relative'
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
          <Link to='/login'>
            <button className='bg-azul_oscuro px-24 py-3 mt-10 rounded-md text-white hover:bg-azul_claro transition'>
              Iniciar sesión
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Register
