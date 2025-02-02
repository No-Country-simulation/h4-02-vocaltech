import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    setIsLoggedIn(false)
  }

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className='px-4 lg:pr-10 md:pr-5'>
      <ul className='flex justify-between items-center lg:gap-10 md:gap-6 sm:gap-2'>
        <li>
          <button
            onClick={() => scrollToSection('home')}
            className='text-lg hover:text-gray-300'
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('solution')}
            className='text-lg hover:text-gray-300'
          >
            Servicios
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('reviews')}
            className='text-lg hover:text-gray-300'
          >
            Reseñas
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('about-us')}
            className='text-lg hover:text-gray-300'
          >
            Nosotros
          </button>
        </li>
        <li>
          <Link to='/emprendedores' className='text-lg hover:text-gray-300'>
            Emprendedores
          </Link>
        </li>
        <li>
          <Link to='/empresas' className='text-lg hover:text-gray-300'>
            Empresas
          </Link>
        </li>
        <li>
          <Link to='/dashboard' className='text-lg hover:text-gray-300'>
            Panel
          </Link>
        </li>
        <li className='ml-auto'>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className='bg-anaranjado px-5 py-2 rounded text-white hover:brightness-110 transition'
            >
              Logout
            </button>
          ) : (
            <Link to='/login'>
              <button className='bg-anaranjado px-5 py-2 rounded text-white hover:brightness-110 transition'>
                Login
              </button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
