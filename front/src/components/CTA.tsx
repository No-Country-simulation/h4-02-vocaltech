import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <div className='bg-primary_400 text-blanco_300 text-center py-12 m-12 rounded-md'>
        <p className='font-bold text-3xl mb-6'>¿Estas ansioso por que trabajemos juntos?</p>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button className="bg-secondary_600 px-5 py-2 rounded text-blanco_300 hover:brightness-110 transition">
            Registrate
          </button>
        </Link>
    </div>
  )
}

export default CTA