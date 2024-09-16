import { Component, OnDestroy } from '@angular/core';
import { IUser } from '../../../home/interfaces/IUser.interface';
import { IUserType } from '../../../home/interfaces/IUserTypes.interface';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { UserService } from '../../../auth/services/user.service';
import { SubscriptionService } from '../../../auth/services/subscription.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnDestroy {
  cartItemCount: number = 0;
  userId: number = 0;
  userDataSubscription: any;
  userData: IUser = {
    userId: 1,
    firstName: '',
    lastName: '',
    username: '',
    userTypeId: 1,
    isLoggedIn: false,
  };
  userType = IUserType;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) {
    this.userDataSubscription = this.subscriptionService.userData
      .asObservable()
      .subscribe((data: IUser) => {
        this.userData = data;
        console.log("USER DATA", this.userData)
      });

    this.userId = Number(localStorage.getItem('userId')!);
    this.userService.getCartItemCount(this.userId).subscribe((data: number) => {
      this.cartItemCount = data;
    });
  }


  ngOnDestroy(): void {
    if(this.userDataSubscription) {
      this.userDataSubscription.unsubcribe()
    }
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
}
