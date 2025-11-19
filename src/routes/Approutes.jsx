import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/autenticacion';


import LoginPage from '../pages/Login';
import DashboardPage from '../pages/Home';
import EventsPage from '../pages/Evento ';
import ReservationDetailPage from '../pages/Reserva';
import ProfilePage from '../pages/profile';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Cargando...</div>;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Login" element={<LoginPage />} />
      
      <Route path="/Home" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/Evento" element={
        <ProtectedRoute>
          <EventsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/reserva/:id" element={
        <ProtectedRoute>
          <ReservationDetailPage />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      
      <Route path="/" element={<Navigate to="/Home" />} />
    </Routes>
  );
};