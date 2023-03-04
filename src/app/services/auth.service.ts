import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:4000/api';
  login(user: IUser) {
    return this.http.post<any>(this.url + '/auth/login', user);
  }
  register(user: IUser) {
    return this.http.post<any>(this.url + '/auth/register', user);
  }
  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  isAuthenticated() {
    let token = localStorage.getItem('token') || '';
    try {
      let jwtPayload = JSON.parse(window.atob(token.split('.')[1]));
      const { exp } = jwtPayload;
      if (exp < (new Date().getTime() + 1) / 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('cartItems');
        return false;
      }
    } catch (err) {
      return false;
    }
    return true;
  }
}
