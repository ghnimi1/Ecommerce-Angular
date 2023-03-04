import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:4000/api';
  private token = localStorage.getItem('token');
  private config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    },
  };
  constructor(private http: HttpClient) {}
  private refreshNeeded = new Subject<void>();
  get refreshNeed() {
    return this.refreshNeeded;
  }
  currentUser = (): Observable<IUser> => {
    return this.http.get<any>(this.url + '/user/me', this.config);
  };
  updateUserProfile = (user: IUser): Observable<IUser> => {
    return this.http
      .patch<any>(this.url + '/user/update', user, this.config)
      .pipe(
        tap(() => {
          this.refreshNeeded.next();
        })
      );
  };
  getUser = (id: any): Observable<IUser> => {
    return this.http.get<any>(this.url + '/user/' + id, this.config);
  };
}
