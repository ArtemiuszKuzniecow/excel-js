const CODES = {
  A: 65,
  Z: 90,
};

function toCell(parentCol) {
  return `
    <div class="excel__table-row-data-cell" data-parent-col="${parentCol}" data-parent-row="" contenteditable></div>
    `;
}

function toColumn(col) {
  return `
    <div class="excel__table-row-data-column" data-type="resizable" data-column="${col}">
    ${col}
    <div class="excel__table-row-data-column-resize" data-resize="col"></div>
    </div>
    `;
}

function toRow(content, info = '') {
  if (info.length) {
    content = content.replaceAll(`data-parent-row=""`, `data-parent-row="${info}"`);
  }
  return `
     <div class="excel__table-row" data-type="resizable" data-row="${info}">
        <div class="excel__table-row-info">
        ${info}
          ${info && '<div class="excel__table-row-info-resize" data-resize="row"></div>'}
        </div>
        <div class="excel__table-row-data" >${content}</div>
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
      .map((_, index) => toCell(toChar(_, index), index))
      .join('');

  rows.push(toRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(toRow(cells, `${i+1}`));
  }

  return rows.join('');
}
