import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shopdetail',
  templateUrl: './shopdetail.component.html',
  styleUrls: ['./shopdetail.component.css'],
})
export class ShopdetailComponent {
  id: any;
  product: any = {};
  comment: string = '';
  review = {
    rating: 0,
    comment: '',
  };
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activate: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.activate.snapshot.paramMap.get('id');
    this.getProductDetails();
    this.productService.refreshNeed.subscribe(() => {
      this.getProductDetails();
    });
  }
  getProductDetails() {
    return this.productService
      .getProductDetails(this.id)
      .subscribe((res) => (this.product = res));
  }
  addReview(id: string) {
    return this.productService.addReview(id, this.review).subscribe(
      (res) => {
        this.toastr.success('Review added');
        this.review.rating = 0;
        this.review.comment = '';
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  floor(b: any) {
    return Math.floor(b);
  }
}
