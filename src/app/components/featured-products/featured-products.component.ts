import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent {
  products: IProduct[] | undefined = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService
      .getAllProducts()
      .subscribe((res) => (this.products = res?.products));
  }
}
