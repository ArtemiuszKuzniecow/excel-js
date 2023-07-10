import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom';
import {primaryColor, borderColorDark, borderColorLight} from '../../helpers/colors';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(100);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const $childrenCol = this.$root.findAll(`[data-parent-col="${$parent.data.column}"]`);
      const $childreRow = this.$root.findAll(`[data-parent-row="${$parent.data.row}"]`);
      const coords = $parent.getCoords();
      const children = $childrenCol.length ? $childrenCol: $childreRow;
      const styleAttributes = {
        size: $childrenCol.length ? 'width' : 'height',
        border: $childrenCol.length ? 'borderRight': 'borderBottom',
      };

      document.onmousemove = (e) => {
        const delta = $childrenCol.length ? e.pageX - coords.right : e.pageY - coords.bottom;
        const value = $childrenCol.length ? coords.width + delta : coords.height + delta;

        [...children, $parent.$el].forEach((element) => {
          element.style[styleAttributes.size] = value + 'px';
          element.setAttribute('data-resize-process', 'true');
          element.style[styleAttributes.border] = `2px solid ${primaryColor}`;
        });
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        const elements = document.querySelectorAll('[data-resize-process="true"]');
        elements.forEach((element) =>{
          if (element.dataset.parent) {
            element.style[styleAttributes.border] = `1px solid ${borderColorLight}`;
          } if (!element.dataset.parent && element.dataset.resizeProcess) {
            element.style[styleAttributes.border] = `1px solid ${borderColorDark}`;
          }
          element.removeAttribute('data-resize-process');
        });
      };
    }
  }
}
