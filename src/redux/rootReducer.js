import {TABLE_RESIZE} from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      const size = state.sizeState || {};
      size[action.data.id] = action.data.value;
      return {...state, sizeState: size};
    default: return state;
  }
}
