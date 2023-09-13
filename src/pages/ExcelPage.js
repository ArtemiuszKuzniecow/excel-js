import {Page} from '@core/Pages';
import {Store} from '@core/createStore';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excelComponents/excel/Excel';
import {Formula} from '@/components/excelComponents/formula/Formula';
import {Table} from '@/components/excelComponents/table/Table';
import {Toolbar} from '@/components/excelComponents/toolbar/Toolbar';
import {Header} from '@/components/excelComponents/header/Header';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeInitialState} from '@/redux/initialState';

function storageName(param) {
  return 'excel:' + param;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(storageName(params));
    const store = new Store(rootReducer,
        normalizeInitialState(state),
    );
    const stateListener = debounce((state) => storage(storageName(params), state), 500);
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

