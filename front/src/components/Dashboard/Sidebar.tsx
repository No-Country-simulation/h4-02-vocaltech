import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col p-9 font-bold sidebar justify-end lg:h-auto'>
        <nav className='flex flex-col'>
            <Link to="/dashboard">Inicio</Link>
            <Link to="/dashboard">Leads</Link>
            <Link to="/dashboard">Servicios</Link>
            <Link to="/dashboard">Diagnósticos</Link>
            <Link to="/dashboard">Reseñas</Link>
            <Link to="/dashboard">Calendario</Link>
        </nav>
        <nav className='flex flex-col self-end'>
            <Link to="/dashboard">Configuración</Link>
            <Link to="/dashboard">Cerrar sesión</Link>
        </nav>
    </div>
  )
}

export default Sidebar