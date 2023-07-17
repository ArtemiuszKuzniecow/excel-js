import {constants} from './table.constants';

export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  clear() {
    this.group.forEach(($el) => {
      if ($el.$el.className.includes(constants.selected)) $el.removeClass(constants.selected);
      if ($el.$el.className.includes(constants.mutliselect)) $el.removeClass(constants.mutliselect);
    });
    this.group = [];
  }

  unselect($el) {
    $el.removeClass(constants.selected);
  }

  selectOne($el) {
    this.clear();
    $el.addClass(constants.selected);
    this.group.push($el);
    this.current = $el;
  }

  selectGroup($els) {
    this.clear();
    $els.forEach((el) => {
      el.addClass(constants.mutliselect);
      this.group.push(el);
    });
    this.current.addClass(constants.selected);
  }
}
