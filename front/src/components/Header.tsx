import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { IoClose } from 'react-icons/io5'
import { HiMenu } from 'react-icons/hi'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className='bg-azul text-white flex px-10 pl-10 pt-4 pb-4 justify-between border-b-4 border-slate-500 relative'>
      <Link to='/'>
        <img className='text-10' src='./logo.png' alt='Logo' />
      </Link>
      <div className='hidden md:block'>
        <Navbar />
      </div>
      <div className='block md:hidden'>
        <button onClick={toggleMenu} aria-label='Toggle Menu'>
          {isMenuOpen ? (
            <IoClose className='text-5xl' />
          ) : (
            <HiMenu className='text-5xl' />
          )}
        </button>
        {isMenuOpen && (
          <div className='absolute top-full left-0 w-full bg-azul text-white z-10'>
            <ul className='flex flex-col items-center text-2xl gap-6 py-4 mb-6'>
              <li>
                <Link to='/' onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/entrepreneurs' onClick={toggleMenu}>
                  Emprendedores
                </Link>
              </li>
              <li>
                <Link to='/companies' onClick={toggleMenu}>
                  Empresas
                </Link>
              </li>
              <li>
                <Link to='/login' onClick={toggleMenu}>
                  <button className='bg-anaranjado px-5 py-2 rounded text-white hover:brightness-110 transition'>
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
