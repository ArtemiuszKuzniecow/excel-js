function toButton(button) {
  const meta = `
    data-type='button'
    data-value='${JSON.stringify(button.value)}'
  `;
  return `
                <div 
                    class="excel__toolbar-buttons-item ${button.active ? 'active': ''}"
                    ${meta}
                >
                    <i 
                        class="excel__toolbar-buttons-item-icon-align-left material-icons"
                        ${meta}
                        >${button.icon}</i>
                </div>
    `;
}

function changeTextDecorationUnderline(state, decoration) {
  if (state.trim() === decoration && !state.includes('none')) {
    return 'none';
  } else if (!state.includes(decoration) && state.includes('none')) {
    return decoration;
  } else if (state.includes(decoration) && !state.includes('none')) {
    return state.replace(decoration, '');
  } else if (!state.includes(decoration) && !state.includes('none')) {
    return `${state} ${decoration}`;
  }
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state.textAlign === 'left',
      value: {textAlign: 'left'},
    },
    {
      icon: 'format_align_center',
      active: state.textAlign === 'center',
      value: {textAlign: 'center'},
    },
    {
      icon: 'format_align_right',
      active: state.textAlign === 'right',
      value: {textAlign: 'right'},
    },
    {
      icon: 'format_bold',
      active: state.fontWeight === 'bold',
      value: {fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold'},
    },
    {
      icon: 'format_italic',
      active: state.fontStyle === 'italic',
      value: {fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic'},
    },
    {
      icon: 'format_underlined',
      active: state.textDecoration.includes('underline'),
      value: {textDecoration: changeTextDecorationUnderline(state.textDecoration, 'underline')},
    },
    {
      icon: 'format_strikethrough',
      active: state.textDecoration.includes('line-through'),
      value: {textDecoration: changeTextDecorationUnderline(state.textDecoration, 'line-through')},
    },
  ];
  return buttons.map(toButton).join('');
}
