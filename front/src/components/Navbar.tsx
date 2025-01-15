import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav>
        <ul className='flex justify-around gap-8 px-4'>
          <li>Home</li>
          <li>Emprendedores</li>
          <li>Empresas</li>
          <li>Login</li>
        </ul>
      </nav>
    </>
  )
}
export default Navbar
