import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
	@Output() search: EventEmitter<string> = new EventEmitter<string>();
	constructor() {}

	ngOnInit() {}

	searchStockName(event) {
		this.search.emit(event.target.value);
	}
}
