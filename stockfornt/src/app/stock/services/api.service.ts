import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const url = environment.stockUrl;
const key = environment.stockApiKey;
const baseUrl = environment.bas_url;

export interface SearchTypes {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

export interface SearchMatch {
  bestMatches: SearchTypes[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private endpoint = {
    getTicket: `${baseUrl}/stock`
  };

  constructor(private http: HttpClient) {}
  // get list of  stocke from api search
  getStockName(search: string): Observable<SearchTypes[]> {
    return this.http
      .get<SearchMatch>(url, {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: search,
          apikey: key
        }
      })
      .pipe(
        map((data: SearchMatch) => {
          const itemData: SearchTypes[] = [];
          data.bestMatches.forEach(item => {
            itemData.push({
              symbol: item['1. symbol'],
              name: item['2. name'],
              type: item['3. type'],
              region: item['4. region'],
              marketOpen: item['5. marketOpen'],
              marketClose: item['6. marketClose'],
              timezone: item['7. timezone'],
              currency: item['8. currency'],
              matchScore: item['9.  matchScore']
            });
          });
          return itemData;
        })
      );
  }
  // add a stock to the stock detail's poll
  addStock(ticket: string) {
    return this.http.get(`${this.endpoint.getTicket}/${ticket}`);
  }
}
