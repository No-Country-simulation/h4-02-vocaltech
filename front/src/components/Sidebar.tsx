import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col h-screen justify-between p-9 font-bold'>
        <nav className='flex flex-col'>
            <Link to="/dashboard">Inicio</Link>
            <Link to="/dashboard">Leads</Link>
            <Link to="/dashboard">Servicios</Link>
            <Link to="/dashboard">Diagnósticos</Link>
            <Link to="/dashboard">Reseñas</Link>
            <Link to="/dashboard">Calendario</Link>
            <Link to="/dashboard">Mensajes</Link>
        </nav>
        <nav className='flex flex-col'>
            <Link to="/dashboard">Configuración</Link>
            <Link to="/dashboard">Cerrar sesión</Link>
        </nav>
    </div>
  )
}

export default Sidebar