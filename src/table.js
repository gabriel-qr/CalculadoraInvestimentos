import { formatCurrency } from './auxiliar.js';

function isNonEmptyArrray(data) {
  return Array.isArray(data) && data.length > 0;
}

function createTableHeader(tableReference, columnsArray) {
  function createThead() {
    const thead = document.createElement('thead');
    tableReference.appendChild(thead);
    return thead;
  }

  const theadReference = tableReference.querySelector('thead') ?? createThead();
  const headerRow = document.createElement('tr');

  columnsArray.forEach((columnObj) => {
    const headerElement = /*html*/ `<th>${columnObj.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  });

  theadReference.appendChild(headerRow);
}

function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbody() {
    const tbody = document.createElement('tbody');
    tableReference.appendChild(tbody);
    return tbody;
  }

  const tbodyReference = tableReference.querySelector('tbody') ?? createTbody();

  for (const [index, item] of tableItems.entries()) {
    const tableRow = document.createElement('tr');

    columnsArray.forEach((columnObj) => {
      const data = columnObj.format
        ? formatCurrency(item[columnObj.accessor])
        : item[columnObj.accessor];

      tableRow.innerHTML += /*html*/ `<td>${data}</td>`;
    });

    tbodyReference.appendChild(tableRow);
  }
}

export function createTable(columnsArray, dataArray, tableId) {
  if (
    !isNonEmptyArrray(columnsArray) ||
    !isNonEmptyArrray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      'Informe corretamente os dados: Array com as colunas, Array com as informações das linhas e o ID do elemento',
    );
  }

  const tableElement = document.getElementById(tableId);

  if (!tableElement || tableElement.nodeName !== 'TABLE')
    throw new Error('Informe um ID válido para o elemento table.');

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
}
