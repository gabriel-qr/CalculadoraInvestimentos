import { generateReturnsArray } from './src/investmentGoals.js';

const form = document.getElementById('form');

function renderProgression(event) {
  event.preventDefault();

  const startingAmount = Number(
    document.getElementById('starting-amount').value.replace(',', '.'),
  );
  const aditionalContribuition = Number(
    document.getElementById('aditional-contribuition').value.replace(',', '.'),
  );
  const timeAmount = Number(document.getElementById('time-amount').value);
  const timePeriod = document.getElementById('time-amount-period').value;
  const returnRate = Number(
    document.getElementById('return-rate').value.replace(',', '.'),
  );
  const returnRatePeriod = document.getElementById('evaluation-period').value;
  const taxRate = Number(
    document.getElementById('profit-taxes-rate').value.replace(',', '.'),
  );

  const result = generateReturnsArray(
    startingAmount,
    timeAmount,
    timePeriod,
    aditionalContribuition,
    returnRate,
    returnRatePeriod,
  );
  console.log(result);
}

form.addEventListener('submit', renderProgression);
