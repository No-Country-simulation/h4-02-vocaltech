import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='bg-azul text-white flex px-10 pl-10 pt-4 pb-4 justify-between border-b-4 border-white'>
      <Link to='/'>
        <img className='text-10' src='./logo.png' alt='Logo' />
      </Link>
      <Navbar />
    </div>
  )
}

export default Header
