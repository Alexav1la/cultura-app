import { useNavigate } from 'react-router-dom';
import Firtimage from "../assets/Firtimage.jpg";

export default function Inicio() {
    const navigate = useNavigate();

    return(
        <div className="container py-5 px-4">
            <h1 className="text-success fw-bold text-center">Bienvenido a Cultura App</h1>
            <br/> <br/>
            <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                    <h2 className="text-success fw-bold text-center text-md-start">Gestión de eventos</h2>
                    <p className="text-success fw-bold text-center text-md-start">
                        Bienvenido al sistema de gestión de eventos, la mejor herramienta para organizar
                        tus actividades o eventos desde la web. Te proporcionaremos las herramientas requeridas
                        para realizar una gestión de eventos presencial, mixta o virtual.
                    </p>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-center">
                    <img src={Firtimage} alt="Gestión de eventos" className="img-fluid mb-3" style={{maxWidth: '400px', borderRadius: '10px'}} />
                    <button
                        type="button"
                        className="btn btn-lg w-100 mt-3 text-white fw-bold"
                        style={{background: 'linear-gradient(135deg, #1e7e34 0%, #2d9e4e 100%)', border: 'none', maxWidth: '320px'}}
                        onClick={() => navigate('/Evento')}
                    >
                        🎫 Empieza tu reserva ahora!
                    </button>
                </div>
            </div>
        </div>
    )
}