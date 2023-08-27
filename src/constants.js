export const defaultStyles = {
  textAlign: 'left',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
};

export const tableConstants = {
  selected: 'excel__table-row-data-cell-selected',
  mutliselect: 'excel__table-row-data-cell-multiselect',
  minValueRow: '1',
  minValueCol: 'A',
};

export const defaultTitle = 'New excel file';

export const pages = ['excel', 'dashboard'];

export const initialPage = 'dashboard';

export const headerButtons = [
  {
    data: 'delete',
    icon: 'excel__header-buttons-item-icon-delete',
    content: 'delete',
  }, {
    data: 'exit',
    icon: 'excel__header-buttons-item-icon-exit',
    content: 'exit_to_app',
  },
];

