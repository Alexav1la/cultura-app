import { useState } from 'react';
import Navbar from '../components/navbar';
import { useReservation } from '../context/reservation';

export default function MisReservas() {
  const { reservations, loading, cancelReservation } = useReservation();
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredReservations = reservations.filter(r => {
    if (filterStatus === 'confirmadas') return r.status === 'confirmed';
    if (filterStatus === 'pendientes') return r.status !== 'confirmed';
    return true;
  });

  const sortedReservations = [...filteredReservations].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleCancelReservation = (reservationId) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta reserva? No se puede deshacer.')) {
      cancelReservation(reservationId);
      alert('Reserva cancelada correctamente');
    }
  };

  const openDetailModal = (reservation) => {
    setSelectedReservation(reservation);
    setShowDetailModal(true);
  };
  const stats = {
    total: reservations.length,
    confirmadas: reservations.filter(r => r.status === 'confirmed').length,
    pendientes: reservations.filter(r => r.status !== 'confirmed').length,
    gastado: reservations.reduce((sum, r) => sum + r.totalPrice, 0)
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid py-5" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
        <div className="container mb-5">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="fw-bold mb-2" style={{ color: '#1e7e34', fontSize: '40px' }}>
                📋 Mis Reservas
              </h1>
              <p className="text-muted mb-0">Gestiona y visualiza todas tus reservas de eventos</p>
            </div>
            <div className="col-md-4 text-end">
              <a 
                href="/Evento" 
                className="btn btn-lg fw-bold"
                style={{
                  background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)',
                  color: 'white',
                  border: 'none'
                }}
              >
                🎫 Nueva Reserva
              </a>
            </div>
          </div>
        </div>
        <div className="container mb-5">
          <div className="row g-3">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', borderLeft: '4px solid #1e7e34' }}>
                <div className="card-body text-center p-4">
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>📊</div>
                  <p className="text-muted small mb-1">Total de Reservas</p>
                  <p className="fw-bold" style={{ fontSize: '32px', color: '#1e7e34' }}>
                    {stats.total}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', borderLeft: '4px solid #28a745' }}>
                <div className="card-body text-center p-4">
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
                  <p className="text-muted small mb-1">Confirmadas</p>
                  <p className="fw-bold" style={{ fontSize: '32px', color: '#28a745' }}>
                    {stats.confirmadas}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', borderLeft: '4px solid #ffc107' }}>
                <div className="card-body text-center p-4">
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>⏳</div>
                  <p className="text-muted small mb-1">Pendientes</p>
                  <p className="fw-bold" style={{ fontSize: '32px', color: '#ffc107' }}>
                    {stats.pendientes}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', borderLeft: '4px solid #17a2b8' }}>
                <div className="card-body text-center p-4">
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>💰</div>
                  <p className="text-muted small mb-1">Gasto Total</p>
                  <p className="fw-bold" style={{ fontSize: '28px', color: '#17a2b8' }}>
                    ${stats.gastado.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
       <div className="container mb-4">
          <div className="d-flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus('todos')}
              className={`btn fw-bold ${filterStatus === 'todos' ? 'btn-success' : 'btn-outline-success'}`}
            >
              📊 Todas ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus('confirmadas')}
              className={`btn fw-bold ${filterStatus === 'confirmadas' ? 'btn-success' : 'btn-outline-success'}`}
            >
              ✅ Confirmadas ({stats.confirmadas})
            </button>
            <button
              onClick={() => setFilterStatus('pendientes')}
              className={`btn fw-bold ${filterStatus === 'pendientes' ? 'btn-success' : 'btn-outline-success'}`}
            >
              ⏳ Pendientes ({stats.pendientes})
            </button>
          </div>
        </div>

        
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="text-muted mt-3">Cargando tus reservas...</p>
            </div>
          ) : sortedReservations.length > 0 ? (
            <div className="row g-4">
              {sortedReservations.map(reservation => (
                <div key={reservation.id} className="col-lg-6">
                  <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <div
                      style={{
                        background: reservation.status === 'confirmed' 
                          ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                          : 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
                        color: 'white',
                        padding: '20px'
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1 fw-bold">{reservation.eventTitle}</h5>
                          <small>Código: {reservation.confirmationCode}</small>
                        </div>
                        <span
                          className="badge"
                          style={{
                            background: reservation.status === 'confirmed' ? '#fff' : '#fff',
                            color: reservation.status === 'confirmed' ? '#28a745' : '#ffc107'
                          }}
                        >
                          {reservation.status === 'confirmed' ? '✅ Confirmada' : '⏳ Pendiente'}
                        </span>
                      </div>
                    </div>
                    <div className="card-body p-4">
                      <div className="row mb-4">
                        <div className="col-6">
                          <p className="text-muted small mb-1">📅 Fecha del Evento</p>
                          <p className="fw-bold" style={{ fontSize: '16px' }}>{reservation.eventDate}</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted small mb-1">🎫 Entradas</p>
                          <p className="fw-bold" style={{ fontSize: '16px' }}>{reservation.quantity}</p>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-6">
                          <p className="text-muted small mb-1">💰 Precio Total</p>
                          <p className="fw-bold" style={{ fontSize: '20px', color: '#1e7e34' }}>
                            ${reservation.totalPrice.toLocaleString()}
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted small mb-1">📅 Reservada el</p>
                          <p className="fw-bold text-muted" style={{ fontSize: '14px' }}>
                            {new Date(reservation.createdAt).toLocaleDateString('es-CO')}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="progress" style={{ height: '6px', background: '#e0e0e0' }}>
                          <div
                            className="progress-bar"
                            style={{
                              width: reservation.status === 'confirmed' ? '100%' : '50%',
                              background: reservation.status === 'confirmed' ? '#28a745' : '#ffc107'
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="d-grid gap-2">
                        <button
                          onClick={() => openDetailModal(reservation)}
                          className="btn btn-outline-success fw-bold mb-2"
                        >
                          👁️ Ver Detalle Completo
                        </button>
                        <button
                          onClick={() => handleCancelReservation(reservation.id)}
                          className="btn btn-outline-danger fw-bold"
                        >
                          ✖️ Cancelar Reserva
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center p-5">
                <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎭</div>
                <h4 className="fw-bold mb-2" style={{ color: '#1e7e34' }}>No hay reservas</h4>
                <p className="text-muted mb-4">
                  {filterStatus === 'todos'
                    ? 'No tienes reservas aún. ¡Comienza a explorar eventos!'
                    : `No tienes reservas ${filterStatus}`}
                </p>
                <a
                  href="/Evento"
                  className="btn btn-lg fw-bold"
                  style={{
                    background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)',
                    color: 'white',
                    border: 'none'
                  }}
                >
                  🎫 Descubre Eventos
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {showDetailModal && selectedReservation && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: '15px' }}>
              <div
                className="modal-header"
                style={{
                  background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px 15px 0 0'
                }}
              >
                <h5 className="modal-title fw-bold">📋 Detalles Completos de la Reserva</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDetailModal(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <h6 className="text-success fw-bold mb-3">Información del Evento</h6>
                <div className="p-3 rounded mb-4" style={{ background: '#f8f9fa', borderLeft: '4px solid #1e7e34' }}>
                  <div className="mb-2">
                    <span className="text-muted small">Nombre del Evento:</span>
                    <p className="fw-bold mb-0">{selectedReservation.eventTitle}</p>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted small">Fecha del Evento:</span>
                    <p className="fw-bold mb-0">{selectedReservation.eventDate}</p>
                  </div>
                </div>
                <h6 className="text-success fw-bold mb-3">Información de la Reserva</h6>
                <div className="p-3 rounded mb-4" style={{ background: '#f8f9fa', borderLeft: '4px solid #1e7e34' }}>
                  <div className="row mb-2">
                    <div className="col-6">
                      <span className="text-muted small">Código de Confirmación:</span>
                      <p className="fw-bold mb-0" style={{ color: '#1e7e34', fontSize: '14px' }}>
                        {selectedReservation.confirmationCode}
                      </p>
                    </div>
                    <div className="col-6">
                      <span className="text-muted small">Estado:</span>
                      <p className="fw-bold mb-0">
                        {selectedReservation.status === 'confirmed' ? '✅ Confirmada' : '⏳ Pendiente'}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <span className="text-muted small">Cantidad de Entradas:</span>
                      <p className="fw-bold mb-0">{selectedReservation.quantity}</p>
                    </div>
                    <div className="col-6">
                      <span className="text-muted small">Fecha de Reserva:</span>
                      <p className="fw-bold mb-0">
                        {new Date(selectedReservation.createdAt).toLocaleDateString('es-CO')}
                      </p>
                    </div>
                  </div>
                </div>
                <h6 className="text-success fw-bold mb-3">Desglose de Precio</h6>
                <div className="p-3 rounded" style={{ background: '#e8f5e9', borderLeft: '4px solid #1e7e34' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Precio por entrada:</span>
                    <span className="fw-bold">
                      ${(selectedReservation.totalPrice / selectedReservation.quantity).toLocaleString()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Cantidad:</span>
                    <span className="fw-bold">× {selectedReservation.quantity}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold" style={{ fontSize: '18px' }}>Total:</span>
                    <span className="fw-bold" style={{ fontSize: '18px', color: '#1e7e34' }}>
                      ${selectedReservation.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0 p-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg flex-grow-1"
                  onClick={() => setShowDetailModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}