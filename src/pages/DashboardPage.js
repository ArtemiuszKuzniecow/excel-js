import {Page} from '@/core/Pages';
import {$} from '@/core/dom';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').html(`
                <div class="db__header">
                <h1>Excel dahsboard</h1>
            </div>
            <div class="db__new">
                <div class="db__view">
                    <a href="#" class="db__create">
                        New <br> sheet
                    </a>
                </div>
            </div>
            <div class="db__table db__view">
                <div class="db__list-header">
                    <span>Name</span>
                    <span>Opening date</span>
                </div>

                <ul class="db__list">
                    <li class="db__list-record">
                        <a href="#">Table #1</a>
                        <strong>12.12.2023</strong>
                    </li>
                    <li class="db__list-record">
                        <a href="#">Table #2</a>
                        <strong>12.12.2023</strong>
                    </li>
                    <li class="db__list-record">
                        <a href="#">Table #3</a>
                        <strong>12.12.2023</strong>
                    </li>
                </ul>
            </div>
    `);
  }
}
