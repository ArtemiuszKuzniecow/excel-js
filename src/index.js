import {Store} from '@/core/createStore';
import {Excel} from '@//components/excel/Excel';
import {Formula} from '@//components/formula/Formula';
import {Table} from '@//components/table/Table';
import {Toolbar} from '@//components/toolbar/Toolbar';
import {Header} from '@/components/header/Header';
import {rootReducer} from '@/redux/rootReducer';
import './scss/index.scss';

const store = new Store(rootReducer);

const excel = new Excel('#app', {components: [Header, Toolbar, Formula, Table], store});

excel.render();
