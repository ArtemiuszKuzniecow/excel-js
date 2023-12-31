export function capitalize(string) {
  if (typeof string !== 'string') return '';

  return string.charAt(0).toUpperCase() + string.substring(1);
}

export function changeLetter(letter, changeWay = 'plus') {
  const newCharCode = changeWay === 'plus' ? letter.charCodeAt(0) + 1 : letter.charCodeAt(0) - 1;
  return String.fromCharCode(newCharCode);
}

export function storage(key, data = null) {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

export function deleteFromStorage(key) {
  localStorage.removeItem(key);
}

export function getLetters(str, word) {
  const letters = [];
  let index = -1;

  while ((index = str.indexOf(word, index + 1)) !== -1) {
    const lastIndex = index + word.length;
    letters.push(str[lastIndex]);
  }

  return letters;
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelToDashCase(str) {
  return str.replace(/[A-Z]/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
      .join('; ');
}

export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
