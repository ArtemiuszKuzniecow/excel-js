import {storage} from '@/core/utils';

const defaultState = {
  sizeState: {},
  dataState: {},
  currentText: '',
};

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState;
