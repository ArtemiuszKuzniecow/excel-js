import {storage} from '@/core/utils';
import {defaultStyles, defaultTitle} from '@/constants.js';

const defaultState = {
  title: defaultTitle,
  sizeState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

const normalize = (state) => ({
  ...state,
});

export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState;
