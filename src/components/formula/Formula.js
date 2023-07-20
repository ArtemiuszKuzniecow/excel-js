import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return `<div class="excel__formula-info">fx</div>
            <div class="excel__formula-input" contenteditable spellcheck="false" data-input="true"></div>`;
  }

  init() {
    super.init();
    this.$on('formula:focus', (text) => {
      console.log('works');
      const input = this.$root.find(`[data-input="true"]`);
      input.text(text);
    });
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    this.$emit('formula:input', text);
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
      this.$emit('formula:unfocus');
    }
  }

  // onMousedown(event) {
  //   focus(this);
  //   function focus(parent) {
  //     parent.$on('formula:focus', (text) => {
  //       const input = parent.$root.find(`[data-input="true"]`);
  //       input.text(text || '');
  //     });
  //   }
  // }
}
