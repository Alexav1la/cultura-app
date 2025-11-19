import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/autenticacion'
import { ReservationProvider } from './context/reservation'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ReservationProvider>
        <App />
      </ReservationProvider>
    </AuthProvider>
  </StrictMode>,
)