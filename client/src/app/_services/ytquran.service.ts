import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { ytquran } from '../_models/ytquran';

@Injectable({
  providedIn: 'root'
})
export class YtquranService {
  baseUrl = environment.apiUrl;
  ytquran: ytquran[] = [];

  constructor(private http: HttpClient) { }

  AddNew(model: any) {
    return this.http.post(this.baseUrl + 'ytquran/addnew', model).pipe(
      map(this.extractData)
    )
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }

  getQurans(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    //console.log(userParams.sura);
    if (userParams.sura !== undefined && userParams.sura !== null)
      params = params.append('sura', userParams.sura);

    if (userParams.verse !== undefined && userParams.verse !== null)
      params = params.append('verse', userParams.verse);

    return this.getPaginatedResult<ytquran[]>(this.baseUrl + 'ytquran', params)
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

  getQuran(id: any) {
    const ytquran1 = this.ytquran.find(x => x.id === id);
    if (ytquran1 !== undefined) return of(ytquran1);
    return this.http.get<ytquran>(this.baseUrl + 'ytquran/' + id);
  }

  updateQuran(ytquran1: ytquran, id: any) {
    return this.http.put(this.baseUrl + 'ytquran/' + id, ytquran1).pipe(
      map(() => {
        const index = this.ytquran.indexOf(ytquran1);
        this.ytquran[index] = ytquran1;
      })
    )
  }
}
