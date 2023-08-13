import {Page} from '@/core/Pages';
import {Store} from '@/core/createStore';
import {debounce, storage} from '@/core/utils';
import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Header} from '@/components/header/Header';
import {rootReducer} from '@/redux/rootReducer';
import {initialState} from '@/redux/initialState';

export class ExcelPage extends Page {
  getRoot() {
    const store = new Store(rootReducer,
        initialState,
    );
    const stateListener = debounce((state) => storage('excel-state', state), 500);
    store.subscribe(stateListener);
    this.excel = new Excel({components: [Header, Toolbar, Formula, Table], store});
    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}

