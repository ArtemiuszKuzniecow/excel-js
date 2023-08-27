import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle, headerButtons} from '@/constants';
import {debounce} from '@core/utils';
import {onButtons} from './header.template';
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {deleteFromStorage} from '@core/utils';
import * as actions from '@/redux/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 500);
    this.$dispatch(actions.lastOpening(Date.now()));
  }

  toHTML() {
    const title = this.store.getState().title;
    return `<input type="text" class="excel__header-input" value="${title || defaultTitle}">
                <div class="excel__header-buttons">
                  ${headerButtons.map((button) => onButtons(button.data, button.icon, button.content)).join('') }`;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.headerButton === 'delete') {
      const key = ActiveRoute.path.split('/').join(':');
      deleteFromStorage(key);
      ActiveRoute.redirectToMainPage();
    } else if ($target.data.headerButton === 'exit') {
      ActiveRoute.redirectToMainPage();
    }
    return;
  }
}
