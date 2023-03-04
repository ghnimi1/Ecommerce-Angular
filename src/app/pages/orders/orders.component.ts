import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders: any = [];
  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.getAllOrders();
  }
  getAllOrders() {
    this.orderService.getAllOrders().subscribe((res) => (this.orders = res));
  }

}
