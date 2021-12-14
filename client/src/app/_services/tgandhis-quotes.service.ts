import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { TGandhis_quotes } from '../_models/tgandhis_quotes';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class TgandhisQuotesService {
  baseUrl = environment.apiUrl;
  tgandhis_quotes: TGandhis_quotes[] = [];

  constructor(private http: HttpClient) { }

  AddNew(model: any) {
    return this.http.post(this.baseUrl + 'gandhi/addnew', model).pipe(
      map(this.extractData)
    )
  }

  private extractData(res: any) {
    let body = res;
    return body;
 }

  getGandhis(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
  
    if (userParams.field1 !== undefined && userParams.field1 !== null)
      params = params.append('field1', userParams.field1);

    return this.getPaginatedResult<TGandhis_quotes[]>(this.baseUrl + 'tgandhis_quotes', params)
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return params;
  }

  getGandhi(id: any) {
    const tgandhis_quote = this.tgandhis_quotes.find(x => x.id === id);
    if (tgandhis_quote !== undefined) return of(tgandhis_quote);
    return this.http.get<TGandhis_quotes>(this.baseUrl + 'tgandhis_quotes/' + id);
  }

  updateGandhi(tgandhis_quote: TGandhis_quotes, id: any) {
    return this.http.put(this.baseUrl + 'tgandhis_quotes/' + id, tgandhis_quote).pipe(
      map(() => {
        const index = this.tgandhis_quotes.indexOf(tgandhis_quote);
        this.tgandhis_quotes[index] = tgandhis_quote;
      })
    )
  }
}
