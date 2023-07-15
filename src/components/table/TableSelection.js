import {constants} from './table.constants';

export class TableSelection {
  constructor() {
    this.group = [];
  }

  unselect($el) {
    $el.removeClass(constants.selected);
  }

  selectOne($el) {
    this.group.push($el);
    $el.addClass(constants.selected);
  }

  selectGroup($els) {
    $els.forEach((el) => {
      el.addClass(constants.mutliselect);
    });
  }
}
