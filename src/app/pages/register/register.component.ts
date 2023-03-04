import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    fullName: '',
    email: '',
    password: '',
  };
  error: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  register() {
    this.authService.register(this.user).subscribe(
      (res) => {
        this.toastr.success('Register Success');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.error = err.error?.message;
      }
    );
  }
}
