import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { zTbible_Chapter_Names } from '../_models/ztbible_chapter_names';

@Injectable({
  providedIn: 'root'
})
export class ZTbibleChapterNamesService {
  baseUrl = environment.apiUrl;
  ztbible_chapter_names: zTbible_Chapter_Names[] = [];

  constructor(private http: HttpClient) { }

  AddNew(model: any) {
    return this.http.post(this.baseUrl + 'bchapter/addnew', model).pipe(
      map(this.extractData)
    )
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }

  getBChapters(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
  
    if (userParams.field2 !== undefined && userParams.field2 !== null)
      params = params.append('field2', userParams.field2);

    return this.getPaginatedResult<zTbible_Chapter_Names[]>(this.baseUrl + 'ztbible_chapter_names', params)
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

  getBChapter(id: any) {
    const ztbible_chapter_name = this.ztbible_chapter_names.find(x => x.id === id);
    if (ztbible_chapter_name !== undefined) return of(ztbible_chapter_name);
    return this.http.get<zTbible_Chapter_Names>(this.baseUrl + 'ztbible_chapter_names/' + id);
  }

  updateBChapter(ztbible_chapter_name: zTbible_Chapter_Names, id: any) {
    return this.http.put(this.baseUrl + 'ztbible_chapter_names/' + id, ztbible_chapter_name).pipe(
      map(() => {
        const index = this.ztbible_chapter_names.indexOf(ztbible_chapter_name);
        this.ztbible_chapter_names[index] = ztbible_chapter_name;
      })
    )
  }
}
