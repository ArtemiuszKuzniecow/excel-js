import {storage} from '@/core/utils';
import {defaultStyles} from '@/constants.js';

const defaultState = {
  sizeState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState;
