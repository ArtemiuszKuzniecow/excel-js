import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title;
    return `<input type="text" class="excel__header-input" value="${title || defaultTitle}">
                <div class="excel__header-buttons">
                    <div class="excel__header-buttons-item">
                        <i class="excel__header-buttons-item-icon-delete material-icons">delete</i>
                    </div>
                <div class="excel__header-buttons-item"><i
                    class="excel__header-buttons-item-icon-exit material-icons">exit_to_app</i></div>`;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
