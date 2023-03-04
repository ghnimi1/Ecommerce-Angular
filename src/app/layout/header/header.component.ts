import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentUser: IUser = {};
  cartItems: any = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') || '')
    : [];

  constructor(
    public authService: AuthService,
    public productService: ProductService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getCurrentUser();
  }
  productsByCategory(category: any) {
    return this.productService.getAllProducts(category);
    //this.router.navigate(['/shop']);
  }
  getCurrentUser() {
    return this.userService
      .currentUser()
      .subscribe((res) => (this.currentUser = res));
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');
    this.router.navigate(['/login']);
  }
}
