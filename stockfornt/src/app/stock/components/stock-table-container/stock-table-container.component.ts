import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from '../stock-container/state/table.model';
import { ID } from '@datorama/akita';

@Component({
	selector: 'app-stock-table-container',
	templateUrl: './stock-table-container.component.html',
	styleUrls: ['./stock-table-container.component.scss']
})
export class StockTableContainerComponent implements OnInit {
	@Input() data: Table[];
	@Output() StockRemove: EventEmitter<ID> = new EventEmitter<ID>();
	constructor() {}

	ngOnInit() {}

	removeStock($event: number | string) {
		this.StockRemove.emit($event);
	}
}
