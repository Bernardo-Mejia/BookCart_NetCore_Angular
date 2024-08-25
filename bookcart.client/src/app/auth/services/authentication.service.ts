import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { map } from 'rxjs';
import { IUser, IUserDetail } from '../../home/interfaces/IUser.interface';
import { SubscriptionService } from './subscription.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  oldUserId: string = '';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) {}

  login(user: any) {
    return this.http.post<any>('https://localhost:7186/api/Login', user).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.oldUserId = localStorage.getItem('userId')!;
          localStorage.setItem('authToken', response.token);
          this.setUserDetails();
          localStorage.setItem('userId', response.userDetails.userId);
          this.userService.cartItemcount$.next(response.carItemCount);
        }
        return response;
      })
    );
  }

  setUserDetails() {
    if (localStorage.getItem('authToken')) {
      const decodeUserDetails = JSON.parse(
        atob(localStorage.getItem('authToken')!.split('.')[1])
      );
      const userDetails: IUserDetail = {
        userId: decodeUserDetails.userid,
        username: decodeUserDetails.sub,
        userTypeId: Number(decodeUserDetails.userTypeId),
        isLoggedIn: true,
      };

      this.subscriptionService.userData.next(userDetails);
    }
  }

  logout() {
    localStorage.clear();
    this.subscriptionService.userData.next(new IUser());
    this.resetSubscription();
    this.setTempUserId();
  }

  setTempUserId() {
    if (!localStorage.getItem('userId')) {
      const tempUserID = this.generateTempUserId();
      localStorage.setItem('userId', tempUserID.toString());
    }
  }

  generateTempUserId() {
    return Math.floor(Math.random() * (99999 - 11111 + 1) + 12345);
  }

  resetSubscription() {
    // this.subscriptionService.userData.next(new User());
    // this.subscriptionService.wishlistItem$.next([]);
    // this.subscriptionService.wishlistItemcount$.next(0);
    // this.subscriptionService.cartItemcount$.next(0);
  }
}
