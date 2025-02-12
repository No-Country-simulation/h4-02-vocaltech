import { Link } from 'react-router-dom'

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
}

const Sidebar = () => {
  return (
    <div className='flex flex-col p-9 font-bold sidebar justify-end lg:h-auto'>
      <nav className='flex flex-col'>
        <Link to='/dashboard'></Link>
        <Link to='/dashboard/graphic'>Inicio</Link>
        <Link to='/dashboard/leads'>Leads</Link>
        <Link to='/dashboard/services'>Servicios</Link>
        <Link to='/dashboard/diagnostics'>Diagnósticos</Link>
        <Link to='/dashboard/reviews'>Reseñas</Link>
        <Link to='/dashboard/calendar'>Calendario</Link>
      </nav>
      <nav className='flex flex-col self-end'>
        <Link to='/dashboard/settings'>Configuración</Link>
        <Link onClick={handleLogout} to='/'>
          Cerrar sesión
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
