// src/components/reservacion.jsx
const ReservationCard = ({ reservation, onCancel, onViewDetail }) => {
  // ✅ Validar que reservation exista
  if (!reservation) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-500 text-center">
          No hay reservas disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold">{reservation.eventTitle}</h3>
          <span className={`text-xs px-2 py-1 rounded ${
            reservation.status === 'confirmed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
          </span>
        </div>
        
        <span className="text-sm text-gray-500">
          #{reservation.confirmationCode}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>📅 Fecha: {reservation.eventDate}</p>
        <p>🎫 Cantidad: {reservation.quantity} entrada(s)</p>
        <p>💰 Total: ${reservation.totalPrice.toLocaleString()}</p>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onViewDetail(reservation.id)}
          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Ver Detalle
        </button>
        
        <button
          onClick={() => onCancel(reservation.id)}
          className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;