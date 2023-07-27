export function capitalize(string) {
  if (typeof string !== 'string') return '';

  return string.charAt(0).toUpperCase() + string.substring(1);
}

export function changeLetter(letter, changeWay = 'plus') {
  const newCharCode = changeWay === 'plus' ? letter.charCodeAt(0) + 1 : letter.charCodeAt(0) - 1;
  return String.fromCharCode(newCharCode);
}
