import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-top-rated-product',
  templateUrl: './top-rated-product.component.html',
  styleUrls: ['./top-rated-product.component.css'],
})
export class TopRatedProductComponent {
  topProduct: IProduct[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getTopProduct();
  }
  getTopProduct() {
    this.productService
      .getTopProducts()
      .subscribe((res) => (this.topProduct = res));
  }
}
