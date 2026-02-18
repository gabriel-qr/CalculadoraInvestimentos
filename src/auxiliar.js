export function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function isObjectEmpty(object) {
  return Object.keys(object).length === 0;
}
