import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Tsggs_chapter_pages } from '../_models/tsggs_chapter_pages';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class TsggsChapterPagesService {
  baseUrl = environment.apiUrl;
  tsggs_chapter_pages: Tsggs_chapter_pages[] = [];

  constructor(private http: HttpClient) { }

  AddNew(model: any) {
    return this.http.post(this.baseUrl + 'schapter/addnew', model).pipe(
      map(this.extractData)
    )
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }

  getSChapters(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
  
    if (userParams.comment !== undefined && userParams.comment !== null)
      params = params.append('comment', userParams.comment);
      
    if (userParams.chapter !== undefined && userParams.chapter !== null)
      params = params.append('chapter', userParams.chapter);

    return this.getPaginatedResult<Tsggs_chapter_pages[]>(this.baseUrl + 'tsggs_chapter___pages', params)
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

  getSChapter(id: any) {
    const tsggs_chapter_page = this.tsggs_chapter_pages.find(x => x.id === id);
    if (tsggs_chapter_page !== undefined) return of(tsggs_chapter_page);
    return this.http.get<Tsggs_chapter_pages>(this.baseUrl + 'tsggs_chapter___pages/' + id);
  }

  updateSChapter(tsggs_chapter_page: Tsggs_chapter_pages, id: any) {
    return this.http.put(this.baseUrl + 'tsggs_chapter___pages/' + id, tsggs_chapter_page).pipe(
      map(() => {
        const index = this.tsggs_chapter_pages.indexOf(tsggs_chapter_page);
        this.tsggs_chapter_pages[index] = tsggs_chapter_page;
      })
    )
  }
}
