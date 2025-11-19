import React from 'react'
import Navbar from '../components/navbar'
import ReservationCard from '../components/reservacion'
import { useReservation } from '../context/reservation' 
import { useAuth } from '../context/autenticacion' 

export default function Reserva() {
  useAuth(); 
  const { reservations, loading, cancelReservation } = useReservation();

  const handleCancel = (reservationId) => {
    if (window.confirm('¿Deseas cancelar esta reserva?')) {
      cancelReservation(reservationId);
    }
  };

  const handleViewDetail = (reservationId) => {
    console.log('Ver detalle de reserva:', reservationId);
    // Aquí puedes navegar a página de detalle o abrir modal
  };

  return (
    <>
      <Navbar/>
      <div className="container py-5">
        <h2 className="text-success">Mis Reservas</h2>
        
        {/* Mostrar loader si está cargando */}
        {loading && (
          <div className="text-center py-5">
            <p className="text-muted">Cargando reservas...</p>
          </div>
        )}
        
        {/* Mostrar reservas si existen */}
        {!loading && reservations.length > 0 ? (
          <div className="space-y-3">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCancel={handleCancel}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-muted mt-4">
              Aquí aparecerán tus reservas. Selecciona "Hacer Reservas" para crear una.
            </p>
          )
        )}
      </div>
    </>
  )
}