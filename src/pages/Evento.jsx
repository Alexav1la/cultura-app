import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import * as api from '../services/api';
import { useAuth } from '../context/autenticacion';
import { useReservation } from '../context/reservation';

export default function Evento() {
  const { user } = useAuth();
  const { createReservation } = useReservation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, searchTerm, categoryFilter]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await api.getEvents();
      setEvents(data);
      
      const uniqueCategories = ['Todos', ...new Set(data.map(e => e.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error cargando eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'Todos') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    setFilteredEvents(filtered);
  };

  const handleReserveClick = (event) => {
    setSelectedEvent(event);
    setQuantity(1);
    setShowModal(true);
  };

  const handleConfirmReservation = async () => {
    if (!user) {
      alert('Debes estar autenticado para hacer una reserva');
      return;
    }

    const totalPrice = selectedEvent.price * quantity;

    const result = await createReservation({
      userId: user.id,
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.date,
      quantity: quantity,
      totalPrice: totalPrice,
      status: 'confirmed'
    });

    if (result.success) {
      alert(`¡Reserva realizada exitosamente!\nCódigo de confirmación: ${result.reservation.confirmationCode}`);
      setShowModal(false);
      setSelectedEvent(null);
      
      await loadEvents();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="mb-4">
          <h1 className="text-success fw-bold">🎭 Eventos Disponibles</h1>
          <p className="text-muted">Descubre y reserva los mejores eventos de tu ciudad</p>
        </div>

        <div className="row mb-4 gap-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="🔍 Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: '#1e7e34', borderWidth: '2px' }}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select form-select-lg"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ borderColor: '#1e7e34', borderWidth: '2px' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-muted mt-3">Cargando eventos...</p>
          </div>
        )}

        {!loading && (
          <>
            {filteredEvents.length > 0 ? (
              <div className="row g-4">
                {filteredEvents.map(event => (
                  <div key={event.id} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '200px',
                          background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '80px'
                        }}
                      >
                        🎭
                      </div>

                      <div className="card-body">
                        <span
                          className="badge mb-2"
                          style={{ background: '#1e7e34', color: 'white' }}
                        >
                          {event.category}
                        </span>

                        <h5 className="card-title fw-bold text-truncate" style={{ color: '#1e7e34' }}>
                          {event.title}
                        </h5>

                        <p className="card-text text-muted small mb-3">
                          {event.description}
                        </p>

                        <div className="mb-3 small">
                          <div className="mb-2">
                            <span className="text-muted">📅</span>
                            <span className="fw-bold ms-2">{event.date}</span>
                          </div>
                          <div className="mb-2">
                            <span className="text-muted">🕐</span>
                            <span className="fw-bold ms-2">{event.time}</span>
                          </div>
                          <div className="mb-2">
                            <span className="text-muted">📍</span>
                            <span className="fw-bold ms-2">{event.location}</span>
                          </div>
                          <div className="mb-2">
                            <span className="text-muted">🪑</span>
                            <span className="fw-bold ms-2">
                              {event.availableSeats} cupo{event.availableSeats !== 1 ? 's' : ''} disponible{event.availableSeats !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <span className="text-muted">Precio unitario:</span>
                          <span
                            className="fw-bold"
                            style={{ fontSize: '18px', color: '#1e7e34' }}
                          >
                            ${event.price.toLocaleString()}
                          </span>
                        </div>

                        <div className="mb-3">
                          <div className="progress" style={{ height: '8px' }}>
                            <div
                              className="progress-bar"
                              style={{
                                width: `${(event.availableSeats / 100) * 100}%`,
                                background: '#1e7e34'
                              }}
                            ></div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleReserveClick(event)}
                          disabled={event.availableSeats === 0}
                          className="btn w-100 fw-bold"
                          style={{
                            background: event.availableSeats > 0 
                              ? 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)' 
                              : '#ccc',
                            color: 'white',
                            border: 'none'
                          }}
                        >
                          {event.availableSeats > 0 ? '🎫 Reservar Ahora' : '❌ Agotado'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info text-center py-5" role="alert">
                <p className="mb-0">No se encontraron eventos que coincidan con tu búsqueda</p>
              </div>
            )}
          </>
        )}
      </div>

      {showModal && selectedEvent && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: '15px' }}>
              <div
                className="modal-header"
                style={{
                  background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)',
                  color: 'white',
                  borderRadius: '15px 15px 0 0',
                  border: 'none'
                }}
              >
                <h5 className="modal-title fw-bold">🎫 Confirmar Reserva</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <h6 className="text-success fw-bold mb-3">Detalles del Evento</h6>
                <div className="mb-4 p-3 rounded" style={{ background: '#f8f9fa' }}>
                  <p className="mb-2"><strong>Evento:</strong> {selectedEvent.title}</p>
                  <p className="mb-2"><strong>Fecha:</strong> {selectedEvent.date} a las {selectedEvent.time}</p>
                  <p className="mb-2"><strong>Ubicación:</strong> {selectedEvent.location}</p>
                  <p className="mb-0"><strong>Precio unitario:</strong> ${selectedEvent.price.toLocaleString()}</p>
                </div>

                <h6 className="text-success fw-bold mb-3">Cantidad de Entradas</h6>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn btn-outline-success"
                  >
                    ➖
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={selectedEvent.availableSeats}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(selectedEvent.availableSeats, parseInt(e.target.value) || 1)))}
                    className="form-control text-center fw-bold"
                    style={{ width: '80px', borderColor: '#1e7e34', borderWidth: '2px' }}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(selectedEvent.availableSeats, quantity + 1))}
                    className="btn btn-outline-success"
                  >
                    ➕
                  </button>
                </div>

                <div className="p-3 rounded mb-4" style={{ background: '#e8f5e9', borderLeft: '4px solid #1e7e34' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Precio unitario:</span>
                    <span className="fw-bold">${selectedEvent.price.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Cantidad:</span>
                    <span className="fw-bold">{quantity}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold" style={{ fontSize: '18px' }}>Total:</span>
                    <span className="fw-bold" style={{ fontSize: '18px', color: '#1e7e34' }}>
                      ${(selectedEvent.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0 p-4 gap-2">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg flex-grow-1"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-lg flex-grow-1 fw-bold"
                  onClick={handleConfirmReservation}
                  style={{
                    background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)',
                    color: 'white',
                    border: 'none'
                  }}
                >
                  ✅ Confirmar Reserva
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}