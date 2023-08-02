import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE} from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      const currentSize = state.sizeState || {};
      currentSize[action.data.id] = action.data.value;
      return {
        ...state,
        sizeState: size,
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
    default: return state;
  }
}
