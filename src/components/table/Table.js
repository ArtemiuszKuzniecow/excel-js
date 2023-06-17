import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  toHTML() {
    return `<div class="excel__table-row">
                    <div class="excel__table-row-info">1</div>
                    <div class="excel__table-row-data">
                        <div class="excel__table-row-data-column">A</div>
                        <div class="excel__table-row-data-column">B</div>
                        <div class="excel__table-row-data-column">C</div>
                        <div class="excel__table-row-data-column">A</div>
                        <div class="excel__table-row-data-column">B</div>
                        <div class="excel__table-row-data-column">C</div>
                        <div class="excel__table-row-data-column">A</div>
                        <div class="excel__table-row-data-column">B</div>
                        <div class="excel__table-row-data-column">C</div>
                        <div class="excel__table-row-data-column">A</div>
                        <div class="excel__table-row-data-column">B</div>
                        <div class="excel__table-row-data-column">C</div>
                        <div class="excel__table-row-data-column">A</div>
                        <div class="excel__table-row-data-column">B</div>
                        <div class="excel__table-row-data-column">C</div>
                    </div>
                </div>
                <div class="excel__table-row">
                    <div class="excel__table-row-info">1</div>
                    <div class="excel__table-row-data">
                        <div class="excel__table-row-data-cell excel__table-row-data-cell-selected">A</div>
                        <div class="excel__table-row-data-cell">B</div>
                        <div class="excel__table-row-data-cell">C</div>
                    </div>
                </div>
                <div class="excel__table-row">
                    <div class="excel__table-row-info">1</div>
                    <div class="excel__table-row-data">
                        <div class="excel__table-row-data-cell">A</div>
                        <div class="excel__table-row-data-cell">B</div>
                        <div class="excel__table-row-data-cell">C</div>
                    </div>
                </div>`;
  }
}
