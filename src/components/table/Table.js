import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {currentCell, currentCells, resizeTable, navigateWithKeys} from './table.methods';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
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

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.$on('formula:unfocus', () => {
      this.selection.current.focusElement();
    });
  }

  onMousedown(event) {
    const target = $(event.target);
    this.$emit('formula:focus', target.text());
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
    const pattern = /^[a-zA-Z0-9,.-]*$/;
    const currentKey = pattern.test(event.key) ? event.key : '';
    this.$emit('formula:focus', event.target.innerText + currentKey);
  }
}

