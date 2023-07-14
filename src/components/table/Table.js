import {ExcelComponent} from '@core/ExcelComponent';
import {resizeTable} from './table.methods';
import {createTable} from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    resizeTable(event, this.$root);
  }
}
