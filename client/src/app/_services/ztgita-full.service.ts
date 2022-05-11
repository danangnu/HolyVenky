import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { Ztgita_Full } from '../_models/ztgita_full';

@Injectable({
  providedIn: 'root'
})
export class ZtgitaFullService {
  baseUrl = environment.apiUrl;
  ztgita_full: Ztgita_Full[] = [];

  constructor(private http: HttpClient) { }

  AddNew(model: any) {
    return this.http.post(this.baseUrl + 'bhaktivedanta/addnew', model).pipe(
      map(this.extractData)
    )
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }

  getBhaktivedantas(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
  
    if (userParams.verse !== undefined && userParams.verse !== null)
      params = params.append('verse', userParams.verse);

    if (userParams.comment !== undefined && userParams.comment !== null)
      params = params.append('comment', userParams.comment);

    return this.getPaginatedResult<Ztgita_Full[]>(this.baseUrl + 'ztgita_full', params)
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

  getBhaktivedanta(id: any) {
    const ztgitafull = this.ztgita_full.find(x => x.id === id);
    if (ztgitafull !== undefined) return of(ztgitafull);
    return this.http.get<Ztgita_Full>(this.baseUrl + 'ztgita_full/' + id);
  }

  updateBhaktivedanta(ztgitafull: Ztgita_Full, id: any) {
    return this.http.put(this.baseUrl + 'ztgita_full/' + id, ztgitafull).pipe(
      map(() => {
        const index = this.ztgita_full.indexOf(ztgitafull);
        this.ztgita_full[index] = ztgitafull;
      })
    )
  }

  getMax(): any {
    return this.http.get(this.baseUrl + 'bhaktivedanta');
  }
}
