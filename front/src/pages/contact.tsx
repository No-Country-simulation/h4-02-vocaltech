import React from 'react'

const Contact = () => {
  return (
    <div className='flex flex-col md:flex-row lg:m-20 items-center justify-center min-h-screen bg-white p-6'>
      {/* Sección del formulario */}
      <div className='w-full md:w-1/2 bg-gray-200 p-8 rounded-lg shadow-lg flex flex-col justify-center h-[900px]'>
        <h2 className='text-6xl font-bold mb-4 text-primary_400'>
          ¿Tenés dudas o querés más información?
        </h2>
        <p className='mt-7 text-lg font-semibold mb-6 text-primary_400'>
          Déjanos un mensaje y te responderemos lo antes posible.
        </p>
        <form className='space-y-4'>
          <div>
            <label className='block text-gray-700 font-semibold mb-1'>
              Nombre
            </label>
            <input
              type='text'
              placeholder='Tu nombre'
              className='w-full p-3 border rounded-lg'
            />
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-1'>
              Correo electrónico
            </label>
            <input
              type='email'
              placeholder='tucorreo@example.com'
              className='w-full p-3 border rounded-lg'
            />
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-1'>
              Teléfono
            </label>
            <input
              type='tel'
              placeholder='Tu número de teléfono'
              className='w-full p-3 border rounded-lg'
            />
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-1'>
              Mensaje
            </label>
            <textarea
              placeholder='Escribe tu mensaje aquí...'
              className='w-full p-3 border rounded-lg h-32'
            ></textarea>
          </div>

          <button
            type='submit'
            className='w-full bg-anaranjado text-white p-3 rounded-lg hover:bg-anaranjado_secundario_300 transition'
          >
            Enviar
          </button>
        </form>
      </div>

      <div className='w-full md:w-1/2 h-[900px]'>
        <img
          src='./Contact.png'
          alt='Contacto'
          className='w-full h-full object-cover rounded-lg shadow-lg'
        />
      </div>
    </div>
  )
}

export default Contact
