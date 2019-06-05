import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TableStore, TableState } from './table.store';
import { Table } from './table.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableQuery extends QueryEntity<TableState, Table> {
  constructor(protected store: TableStore) {
    super(store);
  }
  getTable(): Observable<Table[]> {
    return this.selectAll();
  }
  getError(): Observable<string> {
    return this.selectError();
  }
}
