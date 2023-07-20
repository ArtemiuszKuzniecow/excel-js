class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    this.$el.textContent = text;
    return this;
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    const elementsArray = [];
    this.$el.querySelectorAll(selector).forEach((element) => {
      elementsArray.push($(element));
    });
    return elementsArray;
  }

  addAttribute(attribute, value) {
    this.$el.setAttribute(attribute, value);
  }
  deleteAttribute(attribute) {
    this.$el.removeAttribute(attribute);
  }

  addClass(className) {
    this.$el.classList.add(className);
  }
  removeClass(className) {
    this.$el.classList.remove(className);
  }

  removeInlineCss() {
    Array.from(this.$el.style).forEach((existingStyle) => {
      this.$el.style.removeProperty(existingStyle);
    });
  }

  css(style) {
    Object.keys(style).forEach((styleName) => {
      this.$el.style[styleName] = style[styleName];
    });
  }

  focusElement() {
    // const end = this.$el.textContent.length - 1;
    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(this.$el);
    range.collapse(false);
    selection.addRange(range);
    this.$el.focus();
  }

  id(parse) {
    if (parse) {
      const parsed = this.data.id.split(':');
      return {
        row: parsed[0],
        col: parsed[1],
      };
    }
    if (this.data.id) {
      return this.data.id;
    }
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagname, classes = '') => {
  const el = document.createElement(tagname);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
