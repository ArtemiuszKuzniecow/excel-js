import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom';

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
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const $children = document.querySelectorAll(`[data-parent="${$parent.$el.dataset.column}"]`);
      const coords = $parent.getCoords();

      document.onmousemove = (e) => {
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        [...$children, $parent.$el].forEach((element) => {
          const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
          element.style.width = value + 'px';
          element.setAttribute('data-resize-process', 'true');
          element.style.borderRight = `2px solid ${primaryColor}`;
        });
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        const elements = document.querySelectorAll('[data-resize-process="true"]');
        const borderColorDark = getComputedStyle(document.documentElement).getPropertyValue('--border-color-dark');
        const borderColorLight = getComputedStyle(document.documentElement).getPropertyValue('--border-color-light');
        elements.forEach((element) =>{
          if (element.dataset.parent) {
            element.style.borderRight = `1px solid ${borderColorLight}`;
          } if (!element.dataset.parent && element.dataset.resizeProcess) {
            element.style.borderRight = `1px solid ${borderColorDark}`; element.removeAttribute('data-resize-process');
          }
        });
      };
    }
  }
}
