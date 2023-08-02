import {getLetters} from '@/core/utils';
import {defaultStyles} from '@/constants.js';
import {camelToDashCase} from '../../core/utils';

export const CODES = {
  A: 65,
  Z: 90,
};

function toCell(parentCol, state) {
  const sizeState = state.sizeState;
  const styles = Object.keys(defaultStyles)
      .map((key) => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
      .join('; ');

  return `
    <div 
      class="excel__table-row-data-cell"
      contenteditable 
      ${sizeState[parentCol] ? `style="${styles}; width: ${sizeState[parentCol]}px"` : `${styles}`}
      data-parent-col="${parentCol}" 
      data-parent-row="" 
      data-id="${parentCol}" 
      >
    </div>
    `;
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

function toRow(content, row = '', height, state = '') {
  const cols = getLetters(content, 'data-parent-col="');
  if (row.length) {
    content =
      content
          .replaceAll(`data-parent-row=""`, `data-parent-row="${row}"`)
          .replaceAll(`data-id="`, `data-id="${row}:`);
  }
  if (state.dataState) {
    if (Array.isArray(cols)) {
      cols.forEach((col) => {
        content =
          content.replace(`data-id="${row}:${col}" 
      >`, `data-id="${row}:${col}"
      >${state.dataState?.[`${row}:${col}`] ? state.dataState[`${row}:${col}`]: ''}`);
      });
    }
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
    rows.push(toRow(cells, `${i + 1}`, sizeState[i+1], state));
  }

  return rows.join('');
}
