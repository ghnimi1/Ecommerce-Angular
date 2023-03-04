import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICreateOrderRequest } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/models/IUser';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  id: any;
  order: any = {};
  user: IUser = {};
  public payPalConfig: any;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private activate: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.id = this.activate.snapshot.paramMap.get('id');
    this.getOrder();
    this.orderService.refreshNeed.subscribe(() => this.getOrder());
    this.payPalConfig = {
      currency: 'EUR',
      clientId:
        'AYcFWakGsity3g8gUvfa_dXgBj5RnzLDxyMoC_lFpC7hN84zNvHp4LyBkk3InMME0cRe2Nps6I1wqkK8',
      createOrder: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.order?.totalPrice,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.order?.totalPrice,
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: this.order?.totalPrice,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data: any, actions: any) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data: any) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data: any, actions: any) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err: any) => {
        console.log('OnError', err);
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
      },
    };
  }

  getOrder() {
    return this.orderService.getOrder(this.id).subscribe((res) => {
      this.order = res;
      this.getUser(res?.userId);
    });
  }
  getUser(id: string) {
    return this.userService.getUser(id).subscribe((res) => (this.user = res));
  }
  deliveredOrder(id: string) {
    return this.orderService
      .deliveredOrder(id)
      .subscribe((res) => this.toastr.success('Order delivered'));
  }
  paidOrder(id: string) {
    return this.orderService
      .paidOrder(id)
      .subscribe((res) => this.toastr.success('Success Paid'));
  }
}
