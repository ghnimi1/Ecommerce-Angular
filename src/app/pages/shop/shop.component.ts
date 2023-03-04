import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent {
  products: IProduct[] = [];
  page: number = 1;
  pages: number = 1;
  keyword: string = '';
  pageNumber: any = 1;
  category: any = '';
  sortBy: string = '';
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activate: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.pageNumber = this.activate.snapshot.queryParamMap.get('pageNumber');
    this.category = this.activate.snapshot.queryParamMap.get('category');
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService
      .getAllProducts(this.keyword, this.pageNumber, this.sortBy, this.category)
      .subscribe((res) => {
        this.products = res?.products;
        this.page = res.page;
        this.pages = res.pages;
      });
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  pagesToArr() {
    return [...Array(this.pages)?.keys()];
  }
}
