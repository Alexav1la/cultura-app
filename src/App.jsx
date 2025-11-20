import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Reserva from './pages/Reserva'
import Evento from './pages/Evento'
import Profile from './pages/profile'
import './App.css'
import MisReservas from './pages/mis-reservas'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reservas" element={<Reserva />} />
        <Route path='/mis-reservas' element={<MisReservas/>}/>
        <Route path="/Evento" element={<Evento />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App