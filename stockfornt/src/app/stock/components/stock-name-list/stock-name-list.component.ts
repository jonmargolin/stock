import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchMatch, SearchTypes } from '../../services/api.service';

@Component({
	selector: 'app-stock-name-list',
	templateUrl: './stock-name-list.component.html',
	styleUrls: ['./stock-name-list.component.scss']
})
export class StockNameListComponent implements OnInit {
	@Input() data: SearchTypes[];
	@Output() ticket: EventEmitter<string> = new EventEmitter<string>();
	constructor() {}

	ngOnInit() {}

	getTicketData(symbol: string) {
		this.ticket.emit(symbol);
	}
}
