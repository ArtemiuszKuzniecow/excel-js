import {toInlineStyles} from '@core/utils.js';
import {defaultStyles} from '@/constants.js';
import {parse} from '@core/parse';
export const CODES = {
  A: 65,
  Z: 90,
};

function toCell(parentCol, state) {
  const sizeState = state.sizeState;
  const styles = toInlineStyles(defaultStyles);
  return (parentRow) => {
    const cellContent = state.dataState?.[`${parentRow}:${parentCol}`];
    const currentCellStyle = state.stylesState?.[`${parentRow}:${parentCol}`];
    const currentStyles = currentCellStyle ? toInlineStyles({...defaultStyles, ...currentCellStyle}) : styles;
    return `
    <div 
      class="excel__table-row-data-cell"
      contenteditable 
      ${sizeState[parentCol] ? `style="${currentStyles}; width: ${sizeState[parentCol]}px;"` : `style="${currentStyles};"`}
      data-value="${cellContent || ''}"
      data-parent-col="${parentCol}" 
      data-parent-row="${parentRow}" 
      data-id="${parentRow}:${parentCol}" 
      >${parse(cellContent || '')}
    </div>
    `;
  };
}

function toColumn(col, width) {
  return `
    <div 
    class="excel__table-row-data-column" 
    data-type="resizable" 
    data-column="${col}"
    ${width ? `style="width: ${width}px"` : ''}>
    ${col}
       <div class="excel__table-row-data-column-resize"
       data-resize="col">
     </div>
    </div>
    `;
}

function toRow(content, row = '', height) {
  return `
     <div class="excel__table-row" data-type="resizable" data-row="${row}" ${height ? `style="height: ${height}px"` : ''}>
        <div class="excel__table-row-info">
        ${row}
          ${row && '<div class="excel__table-row-info-resize" data-resize="row"></div>'}
        </div>
        <div class="excel__table-row-data">${content}</div>
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
      .map((_, index) => toCell(toChar(_, index), state));

  const getCells = (row) => cells.map((cell) => cell(row)).join('');

  rows.push(toRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(toRow(getCells(`${i + 1}`), `${i + 1}`, sizeState[i+1]));
  }

  return rows.join('');
}
