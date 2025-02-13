import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter, FaLinkedin, FaSquareYoutube } from "react-icons/fa6";



const Footer = () => {
    return (
        <div className='flex flex-col bg-primary_400 justify-center items-center h-16 gap-4 text-white py-16 mm:flex-row'>
            <div>
                <p>Copyright © 2025 Vocaltech | All Rights Reserved</p>
            </div>
            <div className='flex justify-center items-center gap-4'>
                <Link to='/' className='ml-2'>Home</Link>
                <Link to='#about-us' className='ml-2'>Sobre nosotros</Link>
                <Link to='#solution' className='ml-2'>Servicios</Link>
                <Link to='#contact' className='ml-2'>Contact</Link>
            </div>
            <div className='flex justify-center items-center'>
                <Link to='#' className='ml-2'><FaFacebookSquare /></Link>
                <Link to='#' className='ml-2'><FaSquareInstagram /></Link>
                <Link to='#' className='ml-2'><FaSquareXTwitter /></Link>
                <Link to='#' className='ml-2'><FaLinkedin /></Link>
                <Link to='#' className='ml-2'><FaSquareYoutube /></Link>
            </div>
        </div>
    )
}

export default Footer