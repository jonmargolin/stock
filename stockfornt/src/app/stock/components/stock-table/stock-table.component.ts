import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { Table } from '../stock-container/state/table.model';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {
  stock: StockChart;
  @Input() data: Table;
  @Output() StockRemove: EventEmitter<ID> = new EventEmitter<ID>();
  ngOnInit() {
    this.stock = new StockChart({
      rangeSelector: {
        selected: 1
      },
      title: {
        text: `${this.data.metaData.Symbol}  Stock Price`
      },
      series: [
        {
          tooltip: {
            valueDecimals: 2
          },
          name: this.data.metaData.Symbol,
          data: this.data.data
        }
      ]
    });
  }

  removeStock() {
    this.StockRemove.emit(this.data.id);
  }
}
