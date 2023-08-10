import {Store} from '@/core/createStore';
import {storage} from './core/utils';
import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Header} from '@/components/header/Header';
import {rootReducer} from '@/redux/rootReducer';
import {initialState} from '@/redux/initialState';
import './scss/index.scss';

const store = new Store(rootReducer,
    initialState,
);

store.subscribe((state) => storage('excel-state', state));

const excel = new Excel('#app', {components: [Header, Toolbar, Formula, Table], store});

excel.render();
