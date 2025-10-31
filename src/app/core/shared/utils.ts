export const getError = (error: unknown) => {
  if (!error) return 'Ocorreu um erro desconhecido';
  if (typeof error === 'string') return error;
  if (typeof error === 'object') {
    if ('error' in error) return error.error as string;
    if ('message' in error) return error.message as string;
  }

  return 'Ocorreu um erro desconhecido';
};
