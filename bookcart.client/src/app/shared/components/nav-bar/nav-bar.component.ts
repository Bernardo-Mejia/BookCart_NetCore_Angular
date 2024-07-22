import { Component } from '@angular/core';
import { IUser } from '../../../home/interfaces/IUser.interface';
import { IUserType } from '../../../home/interfaces/IUserTypes.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  cartItemCount: number = 0;
  userData: IUser = {
    userId: 1,
    firstName: '',
    lastName: '',
    username: '',
    userTypeId: 1,
    isLoggedIn: false,
  };
  userType = IUserType;

  constructor(private router: Router) {}
}
