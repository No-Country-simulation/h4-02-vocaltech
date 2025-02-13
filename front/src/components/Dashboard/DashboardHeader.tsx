import { useState } from 'react'
import { SlPencil, SlBell } from 'react-icons/sl'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
}

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full row-start-1 col-span-3 bg-azul_card mb-4 lg:col-start-1 lg:col-end-7 p-5 shadow-md'>
      <div className='flex justify-between items-center'>
        <div className='text-xl mr-2 lg:hidden relative'>
          <button onClick={() => setIsOpen(!isOpen)} className='text-white'>
            <GiHamburgerMenu className='burger-menu' />
          </button>
          {isOpen && (
            <div className='absolute left-0 top-10 bg-azul shadow-md rounded-md p-4 flex flex-col w-48 text-white'>
              <Link
                className='py-1 hover:text-secondary'
                to='/dashboard'
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                className='py-1 hover:text-secondary'
                to='/dashboard/leads'
                onClick={() => setIsOpen(false)}
              >
                Leads
              </Link>
              <Link
                className='py-1 hover:text-secondary'
                to='/dashboard/services'
                onClick={() => setIsOpen(false)}
              >
                Servicios
              </Link>
              <Link
                className='py-1 hover:text-secondary'
                to='/dashboard/diagnostics'
                onClick={() => setIsOpen(false)}
              >
                Diagnósticos
              </Link>
              <Link
                className='py-1 hover:text-secondary'
                to='/dashboard/reviews'
                onClick={() => setIsOpen(false)}
              >
                Reseñas
              </Link>
              <Link
                className='py-1 hover:text-secondary'
                to='/dashboard/calendar'
                onClick={() => setIsOpen(false)}
              >
                Calendario
              </Link>
              <hr className='my-2 border-gray-500' />
              <Link
                className='py-1 hover:text-secondary'
                to='/dashboard/settings'
                onClick={() => setIsOpen(false)}
              >
                Configuración
              </Link>
              <Link
                className='py-1 text-red-400 hover:text-red-600'
                to='/'
                onClick={() => {
                  handleLogout()
                  setIsOpen(false)
                }}
              >
                Cerrar sesión
              </Link>
            </div>
          )}
        </div>

        <div className='hidden lg:block'>
          <Link to='/'>
            <img src='/logo.png' alt='Logo' className='h-10' />
          </Link>
        </div>

        <div className='flex gap-5 items-center text-white'>
          <button className='hover:text-secondary'>
            <SlBell />
          </button>
          <button className='hover:text-secondary'>
            <SlPencil />
          </button>
          <img
            src='/profile.jpeg'
            alt='User'
            className='h-10 w-10 rounded-xl'
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
