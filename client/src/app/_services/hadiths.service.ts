import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hadiths } from '../_models/hadiths';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class HadithsService {
  baseUrl = environment.apiUrl;
  hadiths: Hadiths[] = [];

  constructor(private http: HttpClient) { }

  AddNew(model: any) {
    return this.http.post(this.baseUrl + 'hadith/addnew', model).pipe(
      map(this.extractData)
    )
  }

  private extractData(res: any) {
    let body = res;
    return body;
}

  getTHadiths(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
  
    if (userParams.comment !== undefined && userParams.comment !== null)
      params = params.append('comment', userParams.comment);

    if (userParams.verse !== undefined && userParams.verse !== null)
      params = params.append('verse', userParams.verse);

    return this.getPaginatedResult<Hadiths[]>(this.baseUrl + 'hadiths', params)
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

  getTHadith(id: any) {
    const hadiths = this.hadiths.find(x => x.id === id);
    if (hadiths !== undefined) return of(hadiths);
    return this.http.get<Hadiths>(this.baseUrl + 'hadiths/' + id);
  }

  updateMember(hadith: Hadiths, id: any) {
    return this.http.put(this.baseUrl + 'hadiths/' + id, hadith).pipe(
      map(() => {
        const index = this.hadiths.indexOf(hadith);
        this.hadiths[index] = hadith;
      })
    )
  }

  getMax(): any {
    return this.http.get(this.baseUrl + 'hadith');
  }
}
