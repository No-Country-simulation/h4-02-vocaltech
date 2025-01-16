import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/home'
import Entrepreneurs from './pages/entrepreneurs'
import Companies from './pages/companies'
import Login from './pages/login'

function App() {
  const location = useLocation()
  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Header />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/emprendedores' element={<Entrepreneurs />} />
        <Route path='/empresas' element={<Companies />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
