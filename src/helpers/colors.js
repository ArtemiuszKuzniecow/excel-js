const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
const borderColorDark = getComputedStyle(document.documentElement).getPropertyValue('--border-color-dark');
const borderColorLight = getComputedStyle(document.documentElement).getPropertyValue('--border-color-light');

export {
  primaryColor, borderColorDark, borderColorLight,
};
