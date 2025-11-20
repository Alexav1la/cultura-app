import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/autenticacion';
import Navbar from '../components/navbar';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: localStorage.getItem('userPhone') || '',
    city: localStorage.getItem('userCity') || '',
    country: localStorage.getItem('userCountry') || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('userPhone', formData.phone);
    localStorage.setItem('userCity', formData.city);
    localStorage.setItem('userCountry', formData.country);
    setIsEditing(false);
    alert('Perfil actualizado correctamente');
  };

  const handleLogout = () => {
    if (window.confirm('¿Deseas cerrar sesión?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
              <div 
                className="card-header p-4 text-white"
                style={{
                  background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)',
                  borderRadius: '15px 15px 0 0'
                }}
              >
                <div className="d-flex align-items-center">
                  <div 
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '40px',
                      marginRight: '20px'
                    }}
                  >
                    👤
                  </div>
                  <div>
                    <h2 className="mb-0 fw-bold">{formData.name}</h2>
                    <p className="mb-0 small">{formData.email}</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                {!isEditing ? (
                  <>
                    <div className="mb-4">
                      <h5 className="text-success fw-bold mb-3">Información Personal</h5>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <p className="text-muted mb-1">Nombre</p>
                          <p className="fw-bold">{formData.name}</p>
                        </div>
                        <div className="col-md-6">
                          <p className="text-muted mb-1">Email</p>
                          <p className="fw-bold">{formData.email}</p>
                        </div>
                      </div>
                      
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <p className="text-muted mb-1">Teléfono</p>
                          <p className="fw-bold">{formData.phone || 'No especificado'}</p>
                        </div>
                        <div className="col-md-6">
                          <p className="text-muted mb-1">Ciudad</p>
                          <p className="fw-bold">{formData.city || 'No especificada'}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <p className="text-muted mb-1">País</p>
                          <p className="fw-bold">{formData.country || 'No especificado'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h5 className="text-success fw-bold mb-3">Estadísticas</h5>
                      <div className="row text-center">
                        <div className="col-md-4">
                          <div className="p-3 rounded" style={{ background: '#f0f0f0' }}>
                            <p className="text-muted small mb-1">Total Reservas</p>
                            <p className="fw-bold" style={{ fontSize: '24px', color: '#1e7e34' }}>
                              {localStorage.getItem('reservations') 
                                ? JSON.parse(localStorage.getItem('reservations')).length 
                                : 0}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="p-3 rounded" style={{ background: '#f0f0f0' }}>
                            <p className="text-muted small mb-1">Reservas Confirmadas</p>
                            <p className="fw-bold" style={{ fontSize: '24px', color: '#1e7e34' }}>
                              {localStorage.getItem('reservations') 
                                ? JSON.parse(localStorage.getItem('reservations')).filter(r => r.status === 'confirmed').length 
                                : 0}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="p-3 rounded" style={{ background: '#f0f0f0' }}>
                            <p className="text-muted small mb-1">Eventos</p>
                            <p className="fw-bold" style={{ fontSize: '24px', color: '#1e7e34' }}>
                              {localStorage.getItem('events') 
                                ? JSON.parse(localStorage.getItem('events')).length 
                                : 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-lg flex-grow-1"
                        style={{
                          background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)',
                          color: 'white',
                          border: 'none'
                        }}
                      >
                        ✏️ Editar Perfil
                      </button>
                      <button
                        onClick={handleLogout}
                        className="btn btn-lg btn-danger flex-grow-1"
                      >
                        🚪 Cerrar Sesión
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="text-success fw-bold mb-3">Editar Perfil</h5>
                    <form onSubmit={handleSaveProfile}>
                      <div className="mb-3">
                        <label className="form-label fw-bold text-success">Nombre</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          style={{ borderColor: '#1e7e34', borderWidth: '2px' }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold text-success">Email</label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          name="email"
                          value={formData.email}
                          disabled
                          style={{ borderColor: '#1e7e34', borderWidth: '2px' }}
                        />
                        <small className="text-muted">El email no puede ser modificado</small>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold text-success">Teléfono</label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="3001234567"
                          style={{ borderColor: '#1e7e34', borderWidth: '2px' }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold text-success">Ciudad</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Bogotá"
                          style={{ borderColor: '#1e7e34', borderWidth: '2px' }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold text-success">País</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="Colombia"
                          style={{ borderColor: '#1e7e34', borderWidth: '2px' }}
                        />
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="submit"
                          className="btn btn-lg flex-grow-1"
                          style={{
                            background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)',
                            color: 'white',
                            border: 'none'
                          }}
                        >
                          💾 Guardar Cambios
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="btn btn-lg btn-secondary flex-grow-1"
                        >
                          ✖️ Cancelar
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}