import {tableConstants} from '@/constants.js';

export class TableSelection {
  constructor() {
    this.group = [];
    this.prevCell = null;
    this.prevState = {};
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

  getFullContent($el) {
    const currentPrevCell = this.current;
    const currentPrevState = {
      height: $el.getStyle('height'),
      zIndex: $el.getStyle('z-index'),
      backgroundColor: $el.getStyle('background-color'),
      maxHeight: $el.getStyle('max-height'),
      overflow: $el.getStyle('overflow'),
    };

    if (this.prevCell) {
      if (this.prevCell.id() === this.current.id()) return;
    }

    if (this.prevCell && this.prevState) {
      this.prevCell.css(this.prevState);
    }

    this.prevCell = currentPrevCell;
    this.prevState = currentPrevState;

    this.current.css({
      height: $el.$el.scrollHeight + 'px',
      zIndex: 2000,
      backgroundColor: 'white',
    });
  }
}
