import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './autenticacion';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const data = await api.getReservations(user.id);
      setReservations(data);
    } catch (error) {
      console.error('Error cargando reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadReservations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const createReservation = async (reservationData) => {
    try {
      const newReservation = await api.createReservation(reservationData);
      setReservations([...reservations, newReservation]);
      return { success: true, reservation: newReservation };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const cancelReservation = async (reservationId) => {
    try {
      await api.cancelReservation(reservationId);
      setReservations(
        reservations.filter(r => r.id !== reservationId)
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <ReservationContext.Provider value={{ 
      reservations, 
      loading, 
      createReservation, 
      cancelReservation,
      loadReservations
    }}>
      {children}
    </ReservationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useReservation = () => useContext(ReservationContext);