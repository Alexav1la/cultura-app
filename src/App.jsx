import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Reserva from './pages/Reserva'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
  <Route path= "/reservas" element={<Reserva/>} />
      </Routes>
    </Router>
  )
}

export default App
