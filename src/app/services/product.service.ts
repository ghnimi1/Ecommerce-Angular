import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { IProduct, IReviews } from '../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
  getAllProducts(
    keyword = '',
    pageNumber = '',
    sortBy = '',
    category = ''
  ): Observable<any> {
    let uri = category
      ? this.url + '/product?category=' + category
      : this.url +
        '/product?keyword=' +
        keyword +
        '&pageNumber=' +
        pageNumber +
        '&sortBy=' +
        sortBy;
    return this.http.get<any>(uri);
  }
  getTopProducts(): Observable<any> {
    return this.http.get<any>(this.url + '/product/top-rated');
  }
  getProductDetails(id: string): Observable<IProduct> {
    return this.http.get<any>(this.url + '/product/' + id);
  }
  addReview(id: string, review: IReviews): Observable<any> {
    return this.http
      .post<any>(this.url + '/product/' + id + '/reviews', review, this.config)
      .pipe(
        tap(() => {
          this.refreshNeeded.next();
        })
      );
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.url + '/product', product, this.config);
  }
}
