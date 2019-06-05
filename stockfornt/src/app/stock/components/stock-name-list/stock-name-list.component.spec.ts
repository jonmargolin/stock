import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNameListComponent } from './stock-name-list.component';

describe('StockNameListComponent', () => {
	let component: StockNameListComponent;
	let fixture: ComponentFixture<StockNameListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StockNameListComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StockNameListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
