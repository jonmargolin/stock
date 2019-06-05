import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { StockContainerComponent } from './components/stock-container/stock-container.component';
import { StockNameListComponent } from './components/stock-name-list/stock-name-list.component';
import { HttpClientModule } from '@angular/common/http';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { StockTableComponent } from './components/stock-table/stock-table.component';
import { StockTableContainerComponent } from './components/stock-table-container/stock-table-container.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

export function highchartsModules() {
	// apply Highcharts Modules to this array
	return [stock, more];
}
@NgModule({
	declarations: [
		SearchBarComponent,
		StockContainerComponent,
		StockNameListComponent,
		StockTableComponent,
		StockTableContainerComponent
	],
	imports: [CommonModule, HttpClientModule, ChartModule, ScrollingModule],
	providers: [
		{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } // add as factory to your providers
	],
	exports: [StockContainerComponent]
})
export class StockModule {}
