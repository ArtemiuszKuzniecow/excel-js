import {tableConstants} from '@/constants.js';

export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  clear() {
    this.group.forEach(($el) => {
      if ($el.$el.className.includes(tableConstants.selected)) $el.removeClass(tableConstants.selected);
      if ($el.$el.className.includes(tableConstants.mutliselect)) $el.removeClass(tableConstants.mutliselect);
    });
    this.group = [];
  }

  get selectedIds() {
    return this.group.map(($el) => $el.id());
  }

  selectOne($el) {
    this.clear();
    $el.addClass(tableConstants.selected);
    $el.focusElement();
    this.group.push($el);
    this.current = $el;
  }

  selectGroup($els) {
    this.clear();
    $els.forEach((el) => {
      el.addClass(tableConstants.mutliselect);
      this.group.push(el);
    });
    this.current.addClass(tableConstants.selected);
  }

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
  }
}
