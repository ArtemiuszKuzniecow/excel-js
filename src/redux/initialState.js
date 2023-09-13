import {defaultStyles, defaultTitle} from '@/constants.js';
import {clone} from '@core/utils';

const defaultState = {
  title: defaultTitle,
  sizeState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  lastOpening: Date.now(),
};

const normalize = (state) => ({
  ...state,
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
