import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };
  error: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  login() {
    this.authService.login(this.user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.toastr.success('Login success');
        this.router.navigate(['']);
      },
      (err) => {
        this.error = err.error?.message;
      }
    );
  }
}
