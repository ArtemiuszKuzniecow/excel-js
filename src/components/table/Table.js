import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {currentCell, currentCells, resizeTable, navigateWithKeys} from './table.methods';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';
import * as actions from '@/redux/actions';

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
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="1:A"]');
    this.selection.selectOne($cell);
    this.$emit('formula:focus', $cell.text());

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.$on('formula:unfocus', () => {
      this.selection.current.focusElement();
    });

    this.$subscribe((state) => console.log('table state', state));
  }

  async resizeHandler(event) {
    try {
      const data = await resizeTable(event, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      console.warn('Resize error', error);
    }
  }

  onMousedown(event) {
    const target = $(event.target);
    if (target.data.resize) {
      this.resizeHandler(event);
    } else if (target.id()) {
      this.$emit('formula:focus', target.text());
      const $cell = currentCell(event);
      const $prevCell = this.selection.current;
      this.$dispatch({type: 'test'});
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
    const target = $(event.target);
    const currentId = navigateWithKeys(event, this.selection.current);
    let textContent = event?.key?.length === 1 ? target.text() + event.key : target.text();
    if (currentId) {
      this.selection.selectOne(this.$root.find(`[data-id="${currentId}"]`));
      textContent = this.$root.find(`[data-id="${currentId}"]`).text();
    }
    this.$emit('formula:focus', textContent);
  }
}

