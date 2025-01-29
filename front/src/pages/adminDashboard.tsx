import React from 'react'
import Table from '../components/Table'
import Sidebar from '../components/Sidebar'
import AdminCard from '../components/AdminCard'

const adminDashboard = () => {

  type Card ={
    title: string,
    content: string,
    className?: string
  }

  return (
    <div className='bg-gray-300'>
      <Sidebar />
      <div className='flex flex-row justify-around gap-5 p-4 font-bold'>
      <AdminCard title="Total de leads" content="1.245" className='bg-anaranjado_secundario_300 p-6 w-1/3 rounded-xl shadow-lg flex flex-col justify-center items-left gap-6'/>
      <AdminCard title="Emprendedores" content="800" className='bg-amarillo_secundario_300 p-6 w-1/3 rounded-xl shadow-lg flex flex-col justify-center items-left gap-6'/>
      <AdminCard title="Empresas" content="455" className='bg-azul_secundario_300 p-6 w-1/3 rounded-xl shadow-lg flex flex-col justify-center items-left gap-6'/>
      </div>
      <Table />
    </div>
  )
}

export default adminDashboard
