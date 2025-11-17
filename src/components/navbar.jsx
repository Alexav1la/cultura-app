export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)'}}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#inicio" style={{fontSize: '24px'}}>
          🎭 Cultura App
        </a>
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
              <a 
                className="nav-link active" 
                href="#inicio"
                style={{fontSize: '16px', fontWeight: '500'}}
              >
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#reservas"
                style={{fontSize: '16px', fontWeight: '500'}}
              >
                Hacer Reservas
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#mis-reservas"
                style={{fontSize: '16px', fontWeight: '500'}}
              >
                Mis Reservas
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#acerca-de"
                style={{fontSize: '16px', fontWeight: '500'}}
              >
                Acerca de
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#contacto"
                style={{fontSize: '16px', fontWeight: '500'}}
              >
                Contacto
              </a>
            </li>
            <li className="nav-item ms-2">
              <a 
                className="btn btn-light text-success fw-bold" 
                href="#perfil"
                style={{fontSize: '14px'}}
              >
                👤 Perfil
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
