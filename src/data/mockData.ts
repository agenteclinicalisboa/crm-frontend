export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Limpeza de Pele Profunda',
    description: 'Tratamento completo para renovação e hidratação da pele',
    duration: '60 min',
    price: 120,
    image: '/api/placeholder/300/200'
  },
  {
    id: '2',
    name: 'Massagem Relaxante',
    description: 'Massagem terapêutica para alívio do stress e tensões',
    duration: '90 min',
    price: 180,
    image: '/api/placeholder/300/200'
  },
  {
    id: '3',
    name: 'Tratamento Anti-idade',
    description: 'Protocolo avançado para rejuvenescimento facial',
    duration: '120 min',
    price: 250,
    image: '/api/placeholder/300/200'
  },
  {
    id: '4',
    name: 'Peeling Químico',
    description: 'Renovação celular para pele mais jovem e uniforme',
    duration: '45 min',
    price: 200,
    image: '/api/placeholder/300/200'
  }
];

export const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '09:30', available: true },
  { time: '10:00', available: false },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '11:30', available: false },
  { time: '14:00', available: true },
  { time: '14:30', available: true },
  { time: '15:00', available: true },
  { time: '15:30', available: false },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
  { time: '17:00', available: true }
];

export const beforeAfterPhotos = [
  {
    id: '1',
    before: '/api/placeholder/200/200',
    after: '/api/placeholder/200/200',
    treatment: 'Limpeza de Pele'
  },
  {
    id: '2',
    before: '/api/placeholder/200/200',
    after: '/api/placeholder/200/200',
    treatment: 'Peeling Químico'
  },
  {
    id: '3',
    before: '/api/placeholder/200/200',
    after: '/api/placeholder/200/200',
    treatment: 'Anti-idade'
  },
  {
    id: '4',
    before: '/api/placeholder/200/200',
    after: '/api/placeholder/200/200',
    treatment: 'Hidratação Profunda'
  }
];