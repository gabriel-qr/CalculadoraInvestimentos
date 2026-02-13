export function validateAmount(type, amount) {
  if (amount === NaN && type !== 'Aporte adicional')
    throw new Error(`${type} informado deve ser um número.`);

  if (!amount && type !== 'Aporte adicional')
    throw new Error(`${type} deve ser informado.`);

  if (amount < 0 && type === 'Investimento inicial')
    throw new Error(`${type} deve ser maior do que zero.`);
}

export function validateTimeHorizon(timeHorizon) {
  if (!typeof Number.isInteger(timeHorizon))
    throw new Error('Prazo informado deve ser um número');

  if (!timeHorizon) throw new Error('Investimento inicial deve ser informado');

  if (timeHorizon < 0)
    throw new Error('Investimento inicial deve ser maior do que zero.');
}
