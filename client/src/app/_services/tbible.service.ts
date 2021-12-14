import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { TBible } from '../_models/tbible';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class TBibleService {
  baseUrl = environment.apiUrl;
  tbible: TBible[] = [];

  constructor(private http: HttpClient) { }

  AddNew(model: any) {
    return this.http.post<TBible>(this.baseUrl + 'bible/addnew', model).pipe(
      map(this.extractData)
    )
  }

  private extractData(res: any) {
    let body = res;
    return body;
 }

  getBible(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    if (userParams.bookTitle !== undefined && userParams.bookTitle !== null)
      params = params.append('bookTitle', userParams.bookTitle);

    if (userParams.textData !== undefined && userParams.textData !== null)
      params = params.append('textData', userParams.textData);

    return this.getPaginatedResult<TBible[]>(this.baseUrl + 'tbible', params)
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

  getBible1(id: any) {
    const tbible = this.tbible.find(x => x.id === id);
    if (tbible !== undefined) return of(tbible);
    return this.http.get<TBible>(this.baseUrl + 'tbible/' + id);
  }

  updateMember(tbible1: TBible, id: any) {
    return this.http.put(this.baseUrl + 'tbible/' + id, tbible1).pipe(
      map(() => {
        const index = this.tbible.indexOf(tbible1);
        this.tbible[index] = tbible1;
      })
    )
  }
}
