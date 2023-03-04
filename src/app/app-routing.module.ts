import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShopdetailComponent } from './pages/shopdetail/shopdetail.component';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', canActivate: [AuthGuard], component: CheckoutComponent },
  { path: 'orders', canActivate: [AuthGuard], component: OrdersComponent },
  {
    path: 'create-product',
    canActivate: [AuthGuard],
    component: CreateProductComponent,
  },
  { path: 'order/:id', canActivate: [AuthGuard], component: OrderComponent },
  { path: 'shop/:id', component: ShopdetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
