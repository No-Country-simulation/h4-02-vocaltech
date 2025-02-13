import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { IoClose } from 'react-icons/io5'
import { HiMenu } from 'react-icons/hi'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    setIsLoggedIn(false)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className='bg-blanco_300 text-primary_400 flex px-10 pl-10 pt-4 pb-4 justify-between border-b-4 border-slate-500 relative'>
      <Link to='/'>
        <img className='text-10' src='./logo_azul.png' alt='Logo' />
      </Link>

      <div className='hidden lg:block'>
        <Navbar />
      </div>

      <div className='block lg:hidden'>
        <button onClick={toggleMenu} aria-label='Toggle Menu'>
          {isMenuOpen ? (
            <IoClose className='text-5xl' />
          ) : (
            <HiMenu className='text-5xl' />
          )}
        </button>

        {isMenuOpen && (
          <div className='absolute top-full left-0 w-full bg-azul text-white z-10'>
            <nav className='px-4 py-6'>
              <ul className='flex flex-col items-center justify-center gap-6 text-lg'>
                <li>
                  <button
                    onClick={() => {
                      toggleMenu()
                      scrollToSection('reviews')
                    }}
                    className='hover:text-gray-300'
                  >
                    Reseñas
                  </button>
                </li>
                <li>
                  <Link to='/aboutUs' className='text-lg hover:text-gray-500'>
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link to='/questions' className='text-lg hover:text-gray-500'>
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to='/emprendedores'
                    className='hover:text-gray-300'
                    onClick={toggleMenu}
                  >
                    Emprendedores
                  </Link>
                </li>
                <li>
                  <Link
                    to='/empresas'
                    className='hover:text-gray-300'
                    onClick={toggleMenu}
                  >
                    Empresas
                  </Link>
                </li>
                <li>
                  <Link
                    to='/panel'
                    className='hover:text-gray-300'
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to='/dashboard'
                    className='hover:text-gray-300'
                    onClick={toggleMenu}
                  >
                    Panel
                  </Link>
                </li>
                <li>
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className='bg-anaranjado px-5 py-2 rounded text-white hover:brightness-110 transition'
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to='/login' onClick={toggleMenu}>
                      <button className='bg-secondary_600 px-5 py-2 rounded text-blanco_600 hover:brightness-110 transition'>
                        Login
                      </button>
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
