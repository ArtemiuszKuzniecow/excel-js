import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      ...options,
    });
  }

  toHTML() {
    return ` <div class="excel__toolbar-buttons-item">
                    <i class="excel__toolbar-buttons-item-icon-align-left material-icons">format_align_left</i>
                </div>
                <div class="excel__toolbar-buttons-item">
                    <i class="excel__toolbar-buttons-item-icon-align-center material-icons">format_align_center</i>
                </div>
                <div class="excel__toolbar-buttons-item">
                    <i class="excel__toolbar-buttons-item-icon-align-right material-icons">format_align_right</i>
                </div>
                <div class="excel__toolbar-buttons-item">
                    <i class="excel__toolbar-buttons-item-icon-format-bold material-icons">format_bold</i>
                </div>
                <div class="excel__toolbar-buttons-item">
                    <i class="excel__toolbar-buttons-item-icon-format-italic material-icons">format_italic</i>
                </div>
                <div class="excel__toolbar-buttons-item">
                    <i class="excel__toolbar-buttons-item-icon-format-underlined material-icons">format_underlined</i>
                </div>`;
  }
}
