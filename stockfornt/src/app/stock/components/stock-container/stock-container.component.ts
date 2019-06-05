import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, SearchMatch, SearchTypes } from '../../services/api.service';
import { SocketService } from '../../services/socket.service';
import { TableService } from './state/table.service';
import { Err, Table } from './state/table.model';
import { Observable, of, Subject } from 'rxjs';
import { TableQuery } from './state/table.query';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-stock-container',
  templateUrl: './stock-container.component.html',
  styleUrls: ['./stock-container.component.scss']
})
export class StockContainerComponent implements OnInit, OnDestroy {
  public listData: SearchTypes[];
  private tableData$: Observable<Table[]>;

  public loader = true;
  private destroyed$ = new Subject<void>();
  constructor(
    private apiService: ApiService,
    private socket: SocketService,
    private tableService: TableService,
    private tableQuery: TableQuery,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // get the data from ws bK
    this.socket
      .onNewMessage()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        const res = JSON.parse(data);
        if (res.hasOwnProperty('error')) {
          this.tableService.setError(res.error );
        } else {
          if (this.tableQuery.getCount() === 0) {
              this.tableService.setTable(res);
          } else {
            this.tableService.upsert(res);
          }
        }
      });
    this.tableQuery
      .getError()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(err => {
        if (err) {
          this.toastr.error('error', err);
        }
      });
    this.tableData$ = this.tableQuery.getTable();
    // get the loading state
    this.tableQuery
      .selectLoading()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => {
        if (value === false ) {
          this.loader = false;
        }
      });
  }

  //  get list of name for the ticket.
  startSearch(value: string): void {
    this.apiService
      .getStockName(value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        data => {
          this.listData = data;
        },
        error => {
          this.tableService.setError('can not get dada try again');
        }
      );
  }
  // submit  a tick to the bk
  getTicketData(ticket: string): void {
    this.apiService
      .addStock(ticket)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => {},
        (error: HttpErrorResponse) => {
          this.toastr.info('stock', error.error.message);
        }
      );
  }

  removeStock($event: number | string) {
    this.tableService.remove($event);
  }
  ngOnDestroy(): void {
    this.socket.onDisconnect();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
