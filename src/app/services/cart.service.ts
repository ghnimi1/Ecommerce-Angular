import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') || '')
    : [];

  constructor(private toastr: ToastrService) {}

  addToCart(product: any) {
    const existingIndex = this.cartItems.findIndex(
      (item: any) => item._id === product._id
    );
    if (existingIndex >= 0) {
      this.cartItems[existingIndex] = {
        ...this.cartItems[existingIndex],
        cartQuantity: this.cartItems[existingIndex].cartQuantity + 1,
      };
      this.toastr.info('Increased product quantity');
    } else {
      let tempProductItem = {
        ...product,
        cartQuantity: 1,
      };
      this.cartItems.push(tempProductItem);
      this.toastr.success('Product added to cart');
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  decreaseCart(product: any) {
    const itemIndex = this.cartItems.findIndex(
      (item: any) => item._id === product._id
    );

    if (this.cartItems[itemIndex].cartQuantity > 1) {
      this.cartItems[itemIndex].cartQuantity -= 1;

      this.toastr.info('Decreased product quantity');
    } else if (this.cartItems[itemIndex].cartQuantity === 1) {
      const nextCartItems = this.cartItems.filter(
        (item: any) => item._id !== product._id
      );

      this.cartItems = nextCartItems;

      this.toastr.error('Product removed from cart');
    }

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  removeFromCart(product: any) {
    this.cartItems.map((cartItem: any) => {
      if (cartItem._id === product._id) {
        const nextCartItems = this.cartItems.filter(
          (item: any) => item._id !== cartItem._id
        );

        this.cartItems = nextCartItems;

        this.toastr.error('Product removed from cart');
      }
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    });
  }
  clearCart() {
    this.cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.toastr.error('Cart cleared');
  }
}
