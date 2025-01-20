import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className='px-4 lg:pr-40 md:pr-10'>
        <ul className='flex justify-between items-center lg:gap-16 md:gap-8 sm:gap-4'>
          <li>
            <Link to='/' className='text-lg hover:text-gray-300'>
              Home
            </Link>
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
          <li className='ml-auto'>
            <Link to='/login'>
              <button className='bg-anaranjado px-5 py-2 rounded text-white hover:brightness-110 transition'>
                Login
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
