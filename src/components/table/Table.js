import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup', 'mousemove'],
    });
    this.resizeStore = {
      hasResizeStarted: false,
      initialCoord: 0,
    };
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    const {target} = event;
    if (target.dataset.resize) {
      console.log('start resizing');
      console.log(target);
      this.resizeStore.hasResizeStarted = true;
      console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
      console.log(target.parentNode.getBoundingClientRect());
    }
  }

  onMousemove(event) {
    const {target} = event;
    if (this.resizeStore.hasResizeStarted) {
      console.log('keep resizing');
      console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
      console.log(target.parentNode.getBoundingClientRect());
    }
  }

  onMouseup(event) {
    const {target} = event;
    console.log('finished resizing');
    console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
    this.resizeStore.hasResizeStarted = false;
    console.log(target);
  }
}
