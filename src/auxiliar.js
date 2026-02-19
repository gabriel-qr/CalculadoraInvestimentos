export function formatCurrencyToTable(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatCurrencyToCharts(value) {
  return value.toFixed(2);
}

export function isObjectEmpty(object) {
  return Object.keys(object).length === 0;
}
