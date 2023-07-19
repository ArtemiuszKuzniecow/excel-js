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

        [...children, $parent].forEach((element) => {
          element.css({
            [styleAttributes.size]: `${value}px`,
            [styleAttributes.border]: `2px solid ${primaryColor}`,
          });
          element.addAttribute('data-resize-process', 'true');
        });
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        const elements = this.$root.findAll('[data-resize-process="true"]');
        elements.forEach((element) =>{
          if (element.data.parent) {
            element.css({[styleAttributes.border]: `1px solid ${borderColorLight}`});
          } if (!element.data.parent && element.data.resizeProcess) {
            element.css({[styleAttributes.border]: `1px solid ${borderColorDark}`});
          }
          element.deleteAttribute('data-resize-process');
        });
      };
    }
  }
}
