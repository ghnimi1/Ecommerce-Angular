import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  currentUser: IUser = {};
  user = {
    fullName: this.currentUser.fullName,
    country: this.currentUser.country,
    age: this.currentUser.age,
  };
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCurrentUser();
    this.userService.refreshNeed.subscribe(() => {
      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    return this.userService
      .currentUser()
      .subscribe((res) => (this.currentUser = res));
  }
  updateProfile() {
    return this.userService.updateUserProfile(this.user).subscribe(
      (res) => {
        this.toastr.success('Update profile success');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
