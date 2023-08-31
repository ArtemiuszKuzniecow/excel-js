import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {currentCell, currentCells, resizeTable, navigateWithKeys} from './table.methods';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'paste'],
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
    this.$emit('formula:focus', $cell);
    this.$dispatch(actions.changeText({text: $cell.text()}));
    this.selection.getFullContent($cell);

    this.$on('formula:input', (text) => {
      this.$dispatch(actions.changeText({text: text, id: this.selection.current.id()}));
      this.selection.current.addAttribute('data-value', text).text(parse(text));
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
      const $cell = currentCell(event);
      this.$emit('formula:focus', $cell);
      this.$dispatch(actions.changeText({text: target.data.value}));
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
          this.selection.getFullContent($cell);
        }
      }
    }
  }

  onKeydown(event) {
    const target = $(event.target);
    const currentText = target.text();
    let textContent = event?.key?.length === 1 ? currentText + event.key : currentText;
    if (event?.key === 'Backspace') textContent = currentText.substring(0, currentText.length - 1);
    const navigationId = navigateWithKeys(event, this.selection.current);
    if (navigationId) {
      const $cell = this.$root.find(`[data-id="${navigationId}"]`);
      this.$emit('formula:focus', $cell);
      this.selection.selectOne($cell);
      textContent = $cell.data.value;
      this.$dispatch(actions.changeText({text: textContent}));
      this.selection.current.addAttribute('data-value', textContent);
      const styles = $cell.getStyles(Object.keys(defaultStyles));
      this.$dispatch(actions.changeStyles(styles));
      this.selection.getFullContent($cell);
      return;
    }
  }

  onInput(event) {
    const target = $(event.target);
    const currentText = target.text();
    let textContent = event?.key?.length === 1 ? currentText + event.key : currentText;
    this.$dispatch(actions.changeText({text: textContent, id: target.id()}));
    this.selection.current.addAttribute('data-value', textContent);
    this.$emit('formula:focus', target);
  }

  onPaste(event) {
    event.preventDefault();
    const target = $(event.target);
    const textContent = event.clipboardData.getData('text/plain');
    this.$dispatch(actions.changeText({text: textContent, id: target.id()}));
    this.selection.current.addAttribute('data-value', textContent);
    this.selection.current.text(textContent);
    this.$emit('formula:focus', target);
  }
}


