import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  cartItems: any = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') || '')
    : [];
  address = {
    address: '',
    city: '',
    country: '',
    postalCode: '',
  };
  methodPayment: string = 'Paypal';
  //   Calculate prices
  addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  itemsPrice: any = this.addDecimals(
    this.cartItems.reduce(
      (acc: any, item: any) => acc + item.price * item.cartQuantity,
      0
    )
  );
  shippingPrice = this.addDecimals(this.itemsPrice > 150 ? 0 : 3);
  totalPrice = (Number(this.itemsPrice) + Number(this.shippingPrice)).toFixed(
    2
  );
  constructor(private orderService: OrderService, private router: Router) {}
  addOrder() {
    return this.orderService
      .addOrder({
        orderItems: this.cartItems,
        shippingAddress: this.address,
        paymentMethod: this.methodPayment,
        itemsPrice: this.itemsPrice,
        shippingPrice: this.shippingPrice,
        totalPrice: this.totalPrice,
      })
      .subscribe(
        (res) => {
          this.router.navigate(['/order/' + res._id]);
          localStorage.removeItem('cartItems');
        },
        (err) => console.log(err)
      );
  }
}
