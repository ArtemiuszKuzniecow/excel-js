import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {currentCell, currentCells, resizeTable, navigateWithKeys} from './table.methods';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';
import * as actions from '@/redux/actions';
import {defaultStyles} from '../../constants';

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
    this.$dispatch(actions.changeText({text: $cell.text()}));

    this.$on('formula:input', (text) => {
      this.$dispatch(actions.changeText({text: text, id: this.selection.current.id()}));
      this.selection.current.text(text);
    });

    this.$on('formula:unfocus', () => {
      this.selection.current.focusElement();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
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
      this.$dispatch(actions.changeText({text: target.text()}));
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
          const styles = $cell.getStyles(Object.keys(defaultStyles));
          this.$dispatch(actions.changeStyles(styles));
        }
      }
    }
  }

  onKeydown(event) {
    const target = $(event.target);

    // TODO create helper to optimize it
    let textContent = event?.key?.length === 1 ? target.text() + event.key : target.text();
    if (event?.key === 'Backspace') textContent = target.text().substring(0, target.text().length - 1);

    const navigationId = navigateWithKeys(event, this.selection.current);
    if (navigationId) {
      this.selection.selectOne(this.$root.find(`[data-id="${navigationId}"]`));
      textContent = this.$root.find(`[data-id="${navigationId}"]`).text();
      this.$dispatch(actions.changeText({text: textContent}));
      return;
    }

    this.$dispatch(actions.changeText({text: textContent, id: target.id()}));
    this.$emit('formula:focus', textContent);
  }
}

