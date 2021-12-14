import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { tSGGS_Final } from '../_models/tsggs_final';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class TsggsFinalService {
  baseUrl = environment.apiUrl;
  tsggs_Final: tSGGS_Final[] = [];

  constructor(private http: HttpClient) { }

  AddNew(model: any) {
    return this.http.post(this.baseUrl + 'gurumukhi/addnew', model).pipe(
      map(this.extractData)
    )
  }

  private extractData(res: any) {
    let body = res;
    return body;
 }

  getGurumukhi(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    
    if (userParams.comment !== undefined && userParams.comment !== null)
      params = params.append('comment', userParams.comment);
      
    if (userParams.vERSE !== undefined && userParams.vERSE !== null)
      params = params.append('vERSE', userParams.vERSE);

    return this.getPaginatedResult<tSGGS_Final[]>(this.baseUrl + 'tsggs_final', params)
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

  getGurumukhi1(id: any) {
    const tsggs_final = this.tsggs_Final.find(x => x.id === id);
    if (tsggs_final !== undefined) return of(tsggs_final);
    return this.http.get<tSGGS_Final>(this.baseUrl + 'tsggs_final/' + id);
  }

  updateGurumukhi(tsggs_final1: tSGGS_Final, id: any) {
    return this.http.put(this.baseUrl + 'tsggs_final/' + id, tsggs_final1).pipe(
      map(() => {
        const index = this.tsggs_Final.indexOf(tsggs_final1);
        this.tsggs_Final[index] = tsggs_final1;
      })
    )
  }
}
