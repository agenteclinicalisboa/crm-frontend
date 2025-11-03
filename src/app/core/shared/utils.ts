export const getError = (error: unknown) => {
  if (!error) return 'Ocorreu um erro desconhecido';
  if (typeof error === 'string') return error;
  if (typeof error === 'object') {
    if ('error' in error) return error.error as string;
    if ('message' in error) return error.message as string;
  }

  return 'Ocorreu um erro desconhecido';
};

export const currency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const validatePhone = (phoneNumber: string) => {
  const numbers = phoneNumber.replace(/\D/g, '');
  return numbers.length === 11;
};

export const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return value;
};

export const formatDate = (dateString: string) => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (dateString: string) => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  }).format(date);
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) {
    return `${String(hours)}h e ${String(mins)}m`;
  } else if (hours > 0) {
    return `${String(hours)}h`;
  } else {
    return `${String(mins)}m`;
  }
};
