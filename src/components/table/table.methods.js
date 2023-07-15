import {$} from '@core/dom';

export function resizeTable(event, $root) {
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
  };
}

export function currentCell(event) {
  const currentElement = $(event.target);
  if (currentElement.data.id) return currentElement;
}

export function currentCells(firstCellId, secondCellId) {
  function getRange(start, end) {
    const bigger = start > end ? start : end;
    const smaller = start > end ? end : start;
    const result = [];
    console.log();
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
  const lettersArray = getRange(firstCellId.split(':')[1], secondCellId.split(':')[1]);
  const numbersArray = getRange(Number(firstCellId.split(':')[0]), Number(secondCellId.split(':')[0]));
  return numbersArray
      .map((number) => lettersArray.map((letter) => `${number}:${letter}`))
      .reduce((curr, acc) => acc.concat(...curr), [] );
}
