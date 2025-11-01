export interface TimeSlot {
  time: string;
  available: boolean;
}

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
  { time: '17:00', available: true },
];

export const beforeAfterPhotos = [
  {
    id: '1',
    before: '/api/placeholder/200/200',
    after: '/api/placeholder/200/200',
    treatment: 'Limpeza de Pele',
  },
  {
    id: '2',
    before: '/api/placeholder/200/200',
    after: '/api/placeholder/200/200',
    treatment: 'Peeling Químico',
  },
  {
    id: '3',
    before: '/api/placeholder/200/200',
    after: '/api/placeholder/200/200',
    treatment: 'Anti-idade',
  },
  {
    id: '4',
    before: '/api/placeholder/200/200',
    after: '/api/placeholder/200/200',
    treatment: 'Hidratação Profunda',
  },
];
