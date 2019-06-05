import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { TableStore } from './table.store';
import { Table } from './table.model';
import { normalize } from 'normalizr';
import { tables } from '../../../utils/schema';


@Injectable({ providedIn: 'root' })
export class TableService {
  constructor(private tableStore: TableStore) {}

  setInitLoading() {
    this.tableStore.setLoading(false);
  }
  setError(error: string) {
    this.tableStore.setError(error);
  }
  setTable(table: Table[]) {
    const tableData = normalize(table, tables);
    this.tableStore.set(tableData.entities.tables);
    this.setError(null);
   // this.tableStore.setLoading(false);
  }
  upsert(table) {
    this.tableStore.upsert(table.tables[0].id, { ...table.tables[0] });
  }
  add(table: Table) {
    this.tableStore.add(table);
  }

  update(id, table: Partial<Table>) {
    this.tableStore.update(id, table);
  }

  remove(id: ID) {
    this.tableStore.remove(id);
  }
}
