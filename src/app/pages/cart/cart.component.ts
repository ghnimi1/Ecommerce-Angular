import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') || '')
    : [];
  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    return this.cartService.addToCart(product);
  }
  decreaseCart(product: any) {
    return this.cartService.decreaseCart(product);
  }
  removeFromCart(product: any) {
    return this.cartService.removeFromCart(product);
  }
  clearCart() {
    return this.cartService.clearCart();
  }
  total() {
    return this.cartItems
      .reduce((acc: any, item: any) => acc + item.cartQuantity * item.price, 0)
      .toFixed(2);
  }
}
