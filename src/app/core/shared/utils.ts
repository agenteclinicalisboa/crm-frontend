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

interface ScheduleDay {
  // 1 = Segunda, 7 = Domingo
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export const getNextAvailableDays = (schedule: ScheduleDay[], daysToGenerate = 15) => {
  if (schedule.length === 0) return [];

  const result: { value: string; label: string }[] = [];
  const today = new Date();
  let idx = 0;

  while (result.length <= daysToGenerate) {
    const date = new Date(today);
    date.setDate(today.getDate() + idx);

    const found = schedule.find(s => s.day_of_week === date.getDay());
    if (found) {
      result.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('pt-BR', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
        }),
      });
    }

    idx++;
  }

  return result;
};
