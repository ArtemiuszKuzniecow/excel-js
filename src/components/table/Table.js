// import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {currentCell, currentCells, resizeTable} from './table.methods';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';
import {constants} from './table.constants';

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

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="1:A"]');
    this.selection.selectOne($cell);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeTable(event, this.$root);
    } else if (event.target.dataset.id) {
      const $cell = currentCell(event);
      const $prevCell = this.$root.find(`.${constants.selected}`);
      if ($cell) {
        if (event.shiftKey) {
          const cellIds = [];
          const cells =[];
          $prevCell
            ? cellIds.push(...currentCells($cell.$el.dataset.id, $prevCell.$el.dataset.id))
            : cellIds.push(...currentCells($cell.$el.dataset.id, this.$cell.$el.dataset.id));
          cellIds.forEach((cellId) => {
            cells.push(this.$root.find(`[data-id="${cellId}"]`));
          });
          this.selection.selectGroup(cells);
        } else {
          this.selection.unselect($prevCell);
          this.selection.selectOne($cell);
        }
      }
    }
  }
}

