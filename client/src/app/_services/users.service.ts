import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.apiUrl;
  users: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(headers: HttpHeaders) {
    return this.http.get<User>(this.baseUrl + 'users/', { headers }).pipe(
      map((user) => {
        return user;
      })
    );
  }
}
