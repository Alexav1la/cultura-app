import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)'}}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/home" style={{fontSize: '24px'}}>
          🎭 Cultura App
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className="nav-link active" 
                to="/home"
                style={{fontSize: '16px', fontWeight: '500'}}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/reservas"
                style={{fontSize: '16px', fontWeight: '500'}}
              >
                Hacer Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/mis-reservas"
                style={{fontSize: '16px', fontWeight: '500'}}
              >
                Mis Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/acerca-de"
                style={{fontSize: '16px', fontWeight: '500'}}
              >
                Acerca de
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/contacto"
                style={{fontSize: '16px', fontWeight: '500'}}
              >
                Contacto
              </Link>
            </li>
            <li className="nav-item ms-2">
              <Link 
                className="btn btn-light text-success fw-bold" 
                to="/perfil"
                style={{fontSize: '14px'}}
              >
                👤 Perfil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
