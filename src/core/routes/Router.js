import {$} from '@/core/dom';
import {ActiveRoute} from './ActiveRoute';
import {pages, initialPage} from '@/constants';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is required');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();

    let currentPage;
    if (!pages.includes(ActiveRoute.path)) currentPage = initialPage;
    else currentPage = ActiveRoute.root;

    const Page = this.routes[currentPage];
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
