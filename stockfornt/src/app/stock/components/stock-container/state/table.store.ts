import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { createTable, Table } from './table.model';

export interface TableState extends EntityState<Table> {}
const initialState: EntityState<Table> = {
  entities: {},
  error: undefined,
  ids: [],
  loading: true
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'table' })
export class TableStore extends EntityStore<TableState, Table> {
  constructor() {
    super(initialState);
  }
}
