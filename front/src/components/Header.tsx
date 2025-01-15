import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='flex mx-10 ml-10 mt-2 justify-between'>
      //Logo
      <Navbar />
    </div>
  )
}

export default Header
