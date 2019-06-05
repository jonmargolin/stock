import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTableContainerComponent } from './stock-table-container.component';

describe('StockTableContainerComponent', () => {
  let component: StockTableContainerComponent;
  let fixture: ComponentFixture<StockTableContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockTableContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
