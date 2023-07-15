import {ExcelComponent} from '@core/ExcelComponent';
import {currentCell, resizeTable} from './table.methods';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';
import {constants} from './table.constants';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'click'],
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    console.log('prepare');
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="1:A"]');
    this.selection.selectOne($cell);
  }

  onClick(event) {
    const $cell = currentCell(event);
    if ($cell) {
      const $prevCell = this.$root.find(`.${constants.selected}`);
      this.selection.unselect($prevCell);
      this.selection.selectOne($cell);
    }
  }

  onMousedown(event) {
    resizeTable(event, this.$root);
  }
}
