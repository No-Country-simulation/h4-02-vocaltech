import React from 'react'
import { Link } from 'react-router-dom'

const CTA = (props:any) => {
  return (
    <div className='bg-primary_400 text-blanco_300 text-center p-12 m-12 rounded-md'>
        <p className='font-bold text-3xl mb-6'>{props.title}</p>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button className="bg-secondary_600 px-5 py-2 rounded text-blanco_300 hover:brightness-110 transition">
            {props.button}
          </button>
        </Link>
    </div>
  )
}

export default CTA