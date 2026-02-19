import { generateReturnsArray } from './src/investmentGoals.js';
import Chart from 'chart.js/auto';
import { createTable, resetTable } from './src/table.js';
import { isObjectEmpty, formatCurrencyToCharts } from './src/auxiliar.js';

const form = document.getElementById('form');
const resetButton = document.getElementById('reset-button');
const finalMoneyChart = document.getElementById('final-money-distribuition');
const progressionChart = document.getElementById('progression');

let doughnutChart = {};
let barChart = {};

const columnsArray = [
  {
    columnLabel: 'Mês',
    accessor: 'monthCounter',
    format: false,
  },
  {
    columnLabel: 'Total Investido',
    accessor: 'investedAmount',
    format: true,
  },
  {
    columnLabel: 'Rendimento Mensal',
    accessor: 'interestReturns',
    format: true,
  },
  {
    columnLabel: 'Rendimento Total',
    accessor: 'totalInterestReturns',
    format: true,
  },
  {
    columnLabel: 'Quantia Total',
    accessor: 'totalAmount',
    format: true,
  },
];

function renderProgression(event) {
  event.preventDefault();
  if (document.querySelector('.error')) {
    console.error('DEU RUIM');
    return;
  }

  clearCharts();

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

  const finalResult = result[result.length - 1];

  doughnutChart = new Chart(finalMoneyChart, {
    type: 'doughnut',
    data: {
      labels: ['Total Investido', 'Rendimento Total', 'Impostos'],
      datasets: [
        {
          data: [
            formatCurrencyToCharts(finalResult.investedAmount),
            formatCurrencyToCharts(
              finalResult.totalInterestReturns * (1 - taxRate / 100),
            ),
            formatCurrencyToCharts(
              finalResult.totalInterestReturns * (taxRate / 100),
            ),
          ],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  barChart = new Chart(progressionChart, {
    type: 'bar',
    data: {
      labels: result.map((item) => item.monthCounter),
      datasets: [
        {
          label: 'Total Investido',
          data: result.map((item) =>
            formatCurrencyToCharts(item.investedAmount),
          ),
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Retorno do investimento',
          data: result.map((item) =>
            formatCurrencyToCharts(item.interestReturns),
          ),
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });

  createTable(columnsArray, result, 'results-table');
}

function validateInput(event) {
  const value = event.target.value.replace(',', '.');
  const { parentElement } = event.target;
  const grandParentElement = event.target.parentElement.parentElement;

  const errorTextElement = document.createElement('p');
  errorTextElement.classList.add('text-red-600');
  errorTextElement.classList.add('text-sm');
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

function clearCharts() {
  if (!isObjectEmpty(doughnutChart) && !isObjectEmpty(barChart)) {
    doughnutChart.destroy();
    barChart.destroy();
  }
}

function clearErrors() {
  const errorContainer = document.querySelectorAll('.error');
  for (const container of errorContainer) {
    container.classList.remove('error');
    container.parentElement.querySelector('p').remove();
  }
}

const mainElement = document.querySelector('main');
const carouselElement = document.getElementById('carousel');
const nextButton = document.getElementById('slide-arrow-next');
const previousButton = document.getElementById('slide-arrow-previous');

nextButton.addEventListener('click', () => {
  carouselElement.scrollLeft += mainElement.clientWidth;
});
previousButton.addEventListener('click', () => {
  carouselElement.scrollLeft -= mainElement.clientWidth;
});

resetButton.addEventListener('click', () => {
  form.reset();
  clearErrors();
  clearCharts();
  resetTable();
});

form.addEventListener('submit', renderProgression);
