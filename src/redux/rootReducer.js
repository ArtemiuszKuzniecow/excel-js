import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE, LAST_OPENING} from './types';

export function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
      const currentSize = state.sizeState || {};
      currentSize[action.data.id] = action.data.value;
      return {
        ...state,
        sizeState: currentSize,
      };
    case CHANGE_TEXT:
      const currentText = action.data.text;
      let currentCell;
      if (action.data.id) currentCell = {[action.data.id]: currentText};
      return {
        ...state,
        currentText: currentText,
        dataState: {...state.dataState, ...currentCell},
      };
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data};
    case APPLY_STYLE:
      field = 'stylesState';
      val = state[field]||{};
      action.data.ids.forEach((id) => {
        val[id] = {...val[id], ...action.data.value};
      });
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value},
      };
    case CHANGE_TITLE:
      return {...state, title: action.data};
    case LAST_OPENING:
      return {...state, lastOpening: action.data};
    default: return state;
  }
}
