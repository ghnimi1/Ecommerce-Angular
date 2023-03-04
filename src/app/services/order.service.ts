import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:4000/api';
  private token = localStorage.getItem('token');
  private config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    },
  };
  private refreshNeeded = new Subject<void>();
  get refreshNeed() {
    return this.refreshNeeded;
  }
  getAllOrders(): Observable<any> {
    return this.http.get<any>(this.url + '/order', this.config);
  }
  getOrder(id: string): Observable<any> {
    return this.http.get<any>(this.url + '/order/' + id, this.config);
  }
  addOrder(order: any): Observable<any> {
    return this.http.post(this.url + '/order', order, this.config);
  }
  deliveredOrder(id: string): Observable<any> {
    return this.http
      .get<any>(this.url + '/order/' + id + '/delivered', this.config)
      .pipe(
        tap(() => {
          this.refreshNeeded.next();
        })
      );
  }
  paidOrder(id: string): Observable<any> {
    return this.http
      .get<any>(this.url + '/order/' + id + '/paid', this.config)
      .pipe(
        tap(() => {
          this.refreshNeeded.next();
        })
      );
  }
}
