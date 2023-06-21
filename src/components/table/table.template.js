const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div class="excel__table-row-data-cell" contenteditable></div>
    `;
}

function toColumn(col) {
  return `
    <div class="excel__table-row-data-column">${col}</div>
    `;
}

function toRow(content, info = '') {
  return `
     <div class="excel__table-row">
        <div class="excel__table-row-info">${info}</div>
        <div class="excel__table-row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('');

  rows.push(toRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(toRow(cells, `${i+1}`));
  }

  return rows.join('');
}
