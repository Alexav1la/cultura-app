const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Inicializar datos de ejemplo si no existen
const initializeData = () => {
  if (!localStorage.getItem('events')) {
    const events = [
      {
        id: '1',
        title: 'Concierto de Jazz en el Parque',
        category: 'Música',
        date: '2024-12-15',
        time: '19:00',
        location: 'Parque Nacional',
        price: 25000,
        availableSeats: 100,
        image: '/images/jazz.jpg',
        description: 'Disfruta de una noche de jazz bajo las estrellas'
      },
      {
        id: '2',
        title: 'Exposición de Arte Moderno',
        category: 'Arte',
        date: '2024-12-20',
        time: '10:00',
        location: 'Museo de Arte',
        price: 15000,
        availableSeats: 50,
        image: '/images/art.jpg',
        description: 'Colección única de artistas contemporáneos'
      },
      // ... más eventos
    ];
    localStorage.setItem('events', JSON.stringify(events));
  }

  if (!localStorage.getItem('users')) {
    const users = [
      {
        id: '1',
        email: 'usuario@test.com',
        password: '123456',
        name: 'Usuario Demo',
        phone: '3001234567'
      }
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }

  if (!localStorage.getItem('reservations')) {
    localStorage.setItem('reservations', JSON.stringify([]));
  }
};

initializeData();

// API Simulada
export const login = async (email, password) => {
  await delay();
  
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Credenciales inválidas');
  }
  
  return {
    user: { id: user.id, name: user.name, email: user.email },
    token: `fake-jwt-token-${user.id}`
  };
};

export const getEvents = async (filters = {}) => {
  await delay();
  
  let events = JSON.parse(localStorage.getItem('events') || '[]');
  
  // Aplicar filtros si existen
  if (filters.category) {
    events = events.filter(e => e.category === filters.category);
  }
  
  if (filters.search) {
    events = events.filter(e => 
      e.title.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  
  return events;
};

export const getEventById = async (id) => {
  await delay();
  
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  const event = events.find(e => e.id === id);
  
  if (!event) {
    throw new Error('Evento no encontrado');
  }
  
  return event;
};

export const getReservations = async (userId) => {
  await delay();
  
  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  return reservations.filter(r => r.userId === userId);
};

export const createReservation = async (reservationData) => {
  await delay();
  
  // Validaciones
  if (!reservationData.eventId || !reservationData.userId) {
    throw new Error('Datos incompletos');
  }
  
  if (reservationData.quantity < 1) {
    throw new Error('Cantidad debe ser mayor a 0');
  }
  
  // Verificar disponibilidad
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  const event = events.find(e => e.id === reservationData.eventId);
  
  if (!event) {
    throw new Error('Evento no encontrado');
  }
  
  if (event.availableSeats < reservationData.quantity) {
    throw new Error('No hay suficientes cupos disponibles');
  }
  
  // Crear reserva
  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  const newReservation = {
    id: Date.now().toString(),
    ...reservationData,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    confirmationCode: `CULT-${Math.random().toString(36).substring(7).toUpperCase()}`
  };
  
  reservations.push(newReservation);
  localStorage.setItem('reservations', JSON.stringify(reservations));
  
  // Actualizar disponibilidad del evento
  event.availableSeats -= reservationData.quantity;
  localStorage.setItem('events', JSON.stringify(events));
  
  return newReservation;
};

export const cancelReservation = async (reservationId) => {
  await delay();
  
  let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  const reservation = reservations.find(r => r.id === reservationId);
  
  if (!reservation) {
    throw new Error('Reserva no encontrada');
  }
  
  // Restaurar disponibilidad del evento
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  const event = events.find(e => e.id === reservation.eventId);
  
  if (event) {
    event.availableSeats += reservation.quantity;
    localStorage.setItem('events', JSON.stringify(events));
  }
  
  // Eliminar reserva
  reservations = reservations.filter(r => r.id !== reservationId);
  localStorage.setItem('reservations', JSON.stringify(reservations));
  
  return { success: true };
};

export const rescheduleReservation = async (reservationId, newEventId) => {
  await delay();
  
  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  const reservation = reservations.find(r => r.id === reservationId);
  
  if (!reservation) {
    throw new Error('Reserva no encontrada');
  }
  
  // Verificar disponibilidad del nuevo evento
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  const newEvent = events.find(e => e.id === newEventId);
  
  if (!newEvent || newEvent.availableSeats < reservation.quantity) {
    throw new Error('No hay disponibilidad en el nuevo evento');
  }
  
  // Actualizar reserva
  reservation.eventId = newEventId;
  reservation.updatedAt = new Date().toISOString();
  
  localStorage.setItem('reservations', JSON.stringify(reservations));
  
  return reservation;
};

// Función para convertir archivo a Data URL (base64)
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
