// import {Store} from '@/core/createStore';
// import {debounce, storage} from '@/core/utils';
// import {Excel} from '@/components/excel/Excel';
// import {Formula} from '@/components/formula/Formula';
// import {Table} from '@/components/table/Table';
// import {Toolbar} from '@/components/toolbar/Toolbar';
// import {Header} from '@/components/header/Header';
// import {rootReducer} from '@/redux/rootReducer';
// import {initialState} from '@/redux/initialState';
import {Router} from '@/core/routes/Router';
import './scss/index.scss';

new Router('#app', {

});

// const store = new Store(rootReducer,
//     initialState,
// );

// const stateListener = debounce((state) => storage('excel-state', state), 500);

// store.subscribe(stateListener);

// const excel = new Excel('#app', {components: [Header, Toolbar, Formula, Table], store});

// excel.render();
