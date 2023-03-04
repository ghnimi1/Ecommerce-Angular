import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxStarRatingModule } from 'ngx-star-rating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OfferComponent } from './components/offer/offer.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { TopRatedProductComponent } from './components/top-rated-product/top-rated-product.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrderComponent } from './pages/order/order.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShopdetailComponent } from './pages/shopdetail/shopdetail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    HomeComponent,
    ContactComponent,
    FeaturedComponent,
    CategoriesComponent,
    OfferComponent,
    FeaturedProductsComponent,
    TopRatedProductComponent,
    CartComponent,
    CheckoutComponent,
    CreateProductComponent,
    LoginComponent,
    RegisterComponent,
    OrderComponent,
    ShopComponent,
    ShopdetailComponent,
    ProfileComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    BrowserAnimationsModule,
    NgxPayPalModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'decreasing',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
