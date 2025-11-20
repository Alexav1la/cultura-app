import React from 'react'
import Navbar from '../components/navbar'
import { useReservation } from '../context/reservation' 
import { useAuth } from '../context/autenticacion' 

export default function Reserva() {
  useAuth(); 
  const { reservations, loading, cancelReservation } = useReservation();

  const handleCancel = (reservationId) => {
    if (window.confirm('¿Deseas cancelar esta reserva?')) {
      cancelReservation(reservationId);
      alert('Reserva cancelada exitosamente');
    }
  };

  const handleViewDetail = (reservationId) => {
    const reservation = reservations.find(r => r.id === reservationId);
    if (reservation) {
      alert(`
Detalles de la Reserva:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Código: ${reservation.confirmationCode}
Evento: ${reservation.eventTitle}
Fecha: ${reservation.eventDate}
Cantidad: ${reservation.quantity} entrada(s)
Total: $${reservation.totalPrice.toLocaleString()}
Estado: ${reservation.status === 'confirmed' ? 'Confirmada ✅' : 'Pendiente ⏳'}
      `);
    }
  };

  const totalReservations = reservations.length;
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed').length;
  const totalSpent = reservations.reduce((sum, r) => sum + r.totalPrice, 0);

  return (
    <>
      <Navbar/>
      <div className="container py-5">
        <div className="mb-5">
          <h1 className="text-success fw-bold">📋 Mis Reservas</h1>
          <p className="text-muted">Gestiona todas tus reservas de eventos</p>
        </div>
        {!loading && totalReservations > 0 && (
          <div className="row mb-5 g-3">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 text-center" style={{ borderRadius: '12px' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎫</div>
                <p className="text-muted mb-1 small">Total de Reservas</p>
                <p className="fw-bold" style={{ fontSize: '28px', color: '#1e7e34' }}>
                  {totalReservations}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 text-center" style={{ borderRadius: '12px' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
                <p className="text-muted mb-1 small">Confirmadas</p>
                <p className="fw-bold" style={{ fontSize: '28px', color: '#1e7e34' }}>
                  {confirmedReservations}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 text-center" style={{ borderRadius: '12px' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>💰</div>
                <p className="text-muted mb-1 small">Gasto Total</p>
                <p className="fw-bold" style={{ fontSize: '28px', color: '#1e7e34' }}>
                  ${totalSpent.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-muted mt-3">Cargando tus reservas...</p>
          </div>
        )}
        {!loading && reservations.length > 0 ? (
          <div className="row g-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="col-md-6">
                <ReservationCard
                  reservation={reservation}
                  onCancel={handleCancel}
                  onViewDetail={handleViewDetail}
                />
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="alert alert-info p-5 text-center" role="alert" style={{ borderRadius: '12px' }}>
              <div style={{ fontSize: '60px', marginBottom: '15px' }}>🎭</div>
              <h5 className="fw-bold mb-2">No tienes reservas aún</h5>
              <p className="text-muted mb-3">
                ¡Empieza a explorar eventos y realiza tu primera reserva!
              </p>
              <a href="/Evento" className="btn btn-lg fw-bold" style={{
                background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)',
                color: 'white',
                border: 'none'
              }}>
                🎫 Ir a Eventos
              </a>
            </div>
          )
        )}
      </div>
    </>
  )
}