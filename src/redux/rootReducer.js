import {CHANGE_TEXT, TABLE_RESIZE} from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      const size = state.sizeState || {};
      size[action.data.id] = action.data.value;
      return {...state, sizeState: size};
    case CHANGE_TEXT:
      const currentText = action.data.text;
      let currentCell;
      if (action.data.id) currentCell = {[action.data.id]: action.data.text};
      return {
        ...state, currentText: currentText, dataState: {...state.dataState, ...currentCell}};
    default: return state;
  }
}
