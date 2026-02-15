import { generateReturnsArray } from './src/investmentGoals.js';

const form = document.getElementById('form');
const resetButton = document.getElementById('reset-button');

function renderProgression(event) {
  event.preventDefault();
  if (document.querySelector('.error')) {
    console.error('DEU RUIM');
    return;
  }

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
form.hasAttribute;

function validateInput(event) {
  const value = event.target.value.replace(',', '.');
  const { parentElement } = event.target;
  const grandParentElement = event.target.parentElement.parentElement;

  const errorTextElement = document.createElement('p');
  errorTextElement.classList.add('text-red-600');
  errorTextElement.textContent = 'Informe um valor numérico maior do que zero.';

  if (value === '') return;

  if (
    (isNaN(value) || Number(value) <= 0) &&
    !parentElement.classList.contains('error')
  ) {
    parentElement.classList.add('error');
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains('error') &&
    !isNaN(value) &&
    value > 0
  ) {
    parentElement.classList.remove('error');
    grandParentElement.querySelector('p').remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validateInput);
  }
}

function clearErrors() {
  const errorContainer = document.querySelectorAll('.error');
  for (const container of errorContainer) {
    container.classList.remove('error');
    container.parentElement.querySelector('p').remove();
  }
}

resetButton.addEventListener('click', () => {
  form.reset();
  clearErrors();
});

form.addEventListener('submit', renderProgression);
