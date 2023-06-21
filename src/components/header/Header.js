import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  toHTML() {
    return `<input type="text" class="excel__header-input" value="New sheet">
                <div class="excel__header-buttons">
                    <div class="excel__header-buttons-item">
                        <i class="excel__header-buttons-item-icon-delete material-icons">delete</i>
                    </div>
                <div class="excel__header-buttons-item"><i
                    class="excel__header-buttons-item-icon-exit material-icons">exit_to_app</i></div>`;
  }
}
