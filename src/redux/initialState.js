import {storage} from '@/core/utils';

const defaultState = {sizeState: {}};

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState;
