import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { tSGGS_Final } from '../_models/tsggs_final';
import { tswami_gita_scsv } from '../_models/tswami_gita_scsv';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class TswamiGitaScsvService {
  baseUrl = environment.apiUrl;
  tswami_gita_scsv: tswami_gita_scsv[] = [];

  constructor(private http: HttpClient) { }

  AddNew(model: any) {
    return this.http.post(this.baseUrl + 'purohit/addnew', model).pipe(
      map(this.extractData)
    )
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }

  getPurohits(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    
    if (userParams.comment !== undefined && userParams.comment !== null)
      params = params.append('comment', userParams.comment);
      
    if (userParams.verse !== undefined && userParams.verse !== null)
      params = params.append('verse', userParams.verse);

    return this.getPaginatedResult<tswami_gita_scsv[]>(this.baseUrl + 'tswami_gita_scsv', params)
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

  getPurohit(id: any) {
    const tswami_gita_scsv1 = this.tswami_gita_scsv.find(x => x.id === id);
    if (tswami_gita_scsv1 !== undefined) return of(tswami_gita_scsv1);
    return this.http.get<tswami_gita_scsv>(this.baseUrl + 'tswami_gita_scsv/' + id);
  }

  updatePurohit(tswami_gita_scsv1: tswami_gita_scsv, id: any) {
    return this.http.put(this.baseUrl + 'tswami_gita_scsv/' + id, tswami_gita_scsv1).pipe(
      map(() => {
        const index = this.tswami_gita_scsv.indexOf(tswami_gita_scsv1);
        this.tswami_gita_scsv[index] = tswami_gita_scsv1;
      })
    )
  }
}
