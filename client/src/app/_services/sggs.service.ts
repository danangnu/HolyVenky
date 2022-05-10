import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Tblsggs } from '../_models/tblsggs';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root',
})
export class SggsService {
  baseUrl = environment.apiUrl;
  sggs: Tblsggs[] = [];

  constructor(private http: HttpClient) {}

  getSggs(userParams: UserParams) {
    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );
    if (userParams.bookTitle !== undefined && userParams.bookTitle !== null)
      params = params.append('bookTitle', userParams.bookTitle);

    if (userParams.textData !== undefined && userParams.textData !== null)
      params = params.append('textData', userParams.textData);

    return this.getPaginatedResult<Tblsggs[]>(this.baseUrl + 'sggs', params);
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response) => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get('Pagination')
          );
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

  getTSggs(id: any) {
    const sggs = this.sggs.find((x) => x.id === id);
    if (sggs !== undefined) return of(sggs);
    return this.http.get<Tblsggs>(this.baseUrl + 'sggs/' + id);
  }

  updateSggs(tsggs: Tblsggs, id: any) {
    return this.http.put(this.baseUrl + 'sggs/' + id, tsggs).pipe(
      map(() => {
        const index = this.sggs.indexOf(tsggs);
        this.sggs[index] = tsggs;
      })
    );
  }

  getMax(): any {
    return this.http.get(this.baseUrl + 'gurumukhi');
  }
}
