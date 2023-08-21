import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  toHTML() {
    return `<div class="excel__formula-info">fx</div>
            <div class="excel__formula-input" contenteditable spellcheck="false" data-input="true"></div>`;
  }

  init() {
    super.init();
    const input = this.$root.find(`[data-input="true"]`);
    input.text(this.store.state.currentText);
  }

  storeChanged({currentText}) {
    const changes = currentText.length ? currentText : '';
    this.$root.find(`[data-input="true"]`).text(changes); ;
  }

  onInput(event) {
    const text = event.target.textContent.trim();

    this.$emit('formula:input', text);
  }

  onKeydown(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      event.target.blur();
      this.$emit('formula:unfocus');
    }
  }
}
