export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      const content = String(eval(value.slice(1)));
      if (content !== 'undefined') {
        return content;
      }
    } catch (error) {
      console.warn('Skipping parse error', error.message);
    }
  }
  return value;
}
