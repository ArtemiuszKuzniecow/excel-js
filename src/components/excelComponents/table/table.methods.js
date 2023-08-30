import {$} from '@core/dom';
import {changeLetter} from '@core/utils';
import {tableConstants} from '@/constants.js';

export function resizeTable(event, $root) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const $childrenCol = $root.findAll(`[data-parent-col="${$parent.data.column}"]`);
    const $childreRow = $root.findAll(`[data-parent-row="${$parent.data.row}"]`);
    const coords = $parent.getCoords();
    const children = $childrenCol.length ? $childrenCol : $childreRow;
    const styleAttributes = {
      border: $childrenCol.length ? 'height':'width',
      direction: $childrenCol.length ? 'left' : 'top',
      size: $childrenCol.length ? 'width' : 'height',
    };
    let value;

    document.onmousemove = (e) => {
      const delta = $childrenCol.length ? e.pageX - coords.right : e.pageY - coords.bottom;
      value = $childrenCol.length ? coords.width + delta : coords.height + delta;
      $resizer.css({
        opacity: '1',
        [styleAttributes.border]: '100vw',
        [styleAttributes.direction]: value + 'px',
        zIndex: '1000',
      });
      [...children, $parent].forEach((element) => {
        element.addAttribute('data-resize-process', 'true');
      });
    };

    document.onmouseup = () => {
      $resizer.removeInlineCss();
      document.onmousemove = null;
      document.onmouseup = null;

      const elements = $root.findAll('[data-resize-process="true"]');
      elements.forEach((element) => {
        element.css({
          [styleAttributes.size]: `${value}px`,
        });
        element.deleteAttribute('data-resize-process');
      });
      resolve({
        value,
        id: $childrenCol.length ? $parent.data.column : $parent.data.row,
      });
    };
  });
}

export function currentCell(event) {
  const currentElement = $(event.target);
  if (currentElement.data.id) return currentElement;
}

export function currentCells(current, prev) {
  function getRange(start, end) {
    const bigger = start > end ? start : end;
    const smaller = start > end ? end : start;
    const result = [];
    if (typeof smaller == 'string') {
      for (let i = smaller.charCodeAt(0); i <= bigger.charCodeAt(0); i++ ) {
        result.push(String.fromCharCode(i));
      }
    } else {
      for (let i = smaller; i <= bigger; i++) {
        result.push(i);
      }
    }
    return result;
  };
  const lettersArray = getRange(current.col, prev.col);
  const numbersArray = getRange(Number(current.row), Number(prev.row));
  return numbersArray
      .map((number) => lettersArray.map((letter) => `${number}:${letter}`))
      .reduce((curr, acc) => acc.concat(...curr), [] );
}

export function navigateWithKeys(event, $el) {
  const keyNames = ['Enter', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Tab'];
  const keyName = event.key;
  const currentId = $el.id(true);
  if (keyNames.includes(keyName) && !event.shiftKey) {
    event.preventDefault();
    if (['ArrowRight', 'Tab'].includes(keyName)) {
      currentId.col = changeLetter(currentId.col, 'plus');
    } else if (['Enter', 'ArrowDown'].includes(keyName)) {
      currentId.row = `${Number(currentId.row) + 1}`;
    } else if (keyName === 'ArrowUp') {
      if (currentId.row === tableConstants.minValueRow) return;
      currentId.row = `${Number(currentId.row) - 1}`;
    } else {
      if (currentId.col === tableConstants.minValueCol) return;
      currentId.col = changeLetter(currentId.col, 'minus');
    }
  } else {
    return;
  }
  return `${currentId.row}:${currentId.col}`;
}

export function getFullContent($el) {
  console.log($el.getStyle('height'), $el.getStyle('z-index'), $el.getStyle('background-color'), $el.getStyle('max-height'), $el.getStyle('overflow'));
  // $el.css({
  //   height: $el.$el.scrollHeight + 'px',
  //   zIndex: 2000,
  //   backgroundColor: 'white',
  // });
}
