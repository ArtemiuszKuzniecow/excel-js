import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {currentCell, currentCells, resizeTable, navigateWithKeys} from './table.methods';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="1:A"]');
    this.selection.selectOne($cell);
  }

  onMousedown(event) {
    const target = $(event.target);
    if (target.data.resize) {
      resizeTable(event, this.$root);
    } else if (target.id()) {
      const $cell = currentCell(event);
      const $prevCell = this.selection.current;
      if ($cell) {
        if (event.shiftKey) {
          const cells =[];
          currentCells($cell.id(true), $prevCell.id(true)).forEach((cellId) => {
            cells.push(this.$root.find(`[data-id="${cellId}"]`));
          });
          this.selection.selectGroup(cells);
        } else {
          this.selection.selectOne($cell);
        }
      }
    }
  }

  onKeydown(event) {
    const currentId = navigateWithKeys(event, this.selection.current);
    if (currentId) {
      this.selection.selectOne(this.$root.find(`[data-id="${currentId}"]`));
    }
  }
}

