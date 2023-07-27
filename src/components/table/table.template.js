export const CODES = {
  A: 65,
  Z: 90,
};

function toCell(parentCol, state) {
  const sizeState = state.sizeState;
  return `
    <div 
      class="excel__table-row-data-cell" 
      data-parent-col="${parentCol}" 
      data-parent-row="" 
      data-id="${parentCol}" 
      ${sizeState[parentCol] ? `style="width: ${sizeState[parentCol]}px"` : ''}
      contenteditable 
      >
    </div>
    `;
}

function toColumn(col, width) {
  return `
    <div class="excel__table-row-data-column" data-type="resizable" data-column="${col}" ${width ? `style="width: ${width}px"` : ''}>
    ${col}
    <div class="excel__table-row-data-column-resize" data-resize="col"></div>
    </div>
    `;
}

function toRow(content, row = '', height ) {
  if (row.length) {
    content =
      content
          .replaceAll(`data-parent-row=""`, `data-parent-row="${row}"`)
          .replaceAll(`data-id="`, `data-id="${row}:`);
  }
  return `
     <div class="excel__table-row" data-type="resizable" data-row="${row}" ${height ? `style="height: ${height}px"` : ''}>
        <div class="excel__table-row-info">
        ${row}
          ${row && '<div class="excel__table-row-info-resize" data-resize="row"></div>'}
        </div>
        <div class="excel__table-row-data" >${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state = {}) {
  const sizeState = state.sizeState;
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((col) => toColumn(col, sizeState[col]))
      .join('');

  const cells = new Array(colsCount)
      .fill('')
      .map((_, index) => toCell(toChar(_, index), state))
      .join('');

  rows.push(toRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(toRow(cells, `${i + 1}`, sizeState[i+1]));
  }

  return rows.join('');
}
