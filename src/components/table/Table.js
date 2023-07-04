import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup', 'mousemove'],
    });
    this.resizeStore = {
      hasResizeStartedX: false,
      initialCoordX: 0,
      finalCoordX: 0,
      currentElement: null,
    };
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    const {target} = event;
    if (target.dataset.resize) {
      if (target.dataset.resize === 'col') {
        this.resizeStore.hasResizeStartedX = true;
        this.initialCoordX = Number(event.clientX);
        this.currentElement = target.parentNode;
      }
    }
  }

  onMousemove(event) {
  }

  onMouseup(event) {
    this.finalCoordX = Number(event.clientX) - Number(this.initialCoordX);
    this.currentElement.style = `width: ${this.currentElement.offsetWidth + this.finalCoordX}px`;
    this.resizeStore.hasResizeStartedX = false;
    this.initialCoordX = 0;
    this.finalCoordX = 0;
    this.currentElement = null;
  }
}
