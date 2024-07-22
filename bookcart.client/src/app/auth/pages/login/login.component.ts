import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../../../home/interfaces/IUser.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  
  showPassword = true;
  userId: number = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private cartService: CartService,
    // private authenticationService: AuthenticationService,
    // private subscriptionService: SubscriptionService,
    // private wishlistService: WishlistService
  ) { }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    // this.subscriptionService.userData.asObservable()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((data: IUser) => {
    //     this.userId = data.userId;
    //   });
  }

  login() {
    if (this.loginForm.valid) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      // this.authenticationService.login(this.loginForm.value)
      //   .pipe(takeUntil(this.unsubscribe$))
      //   .subscribe(
      //     () => {
      //       this.setShoppingCart();
      //       this.setWishlist();
      //       this.router.navigate([returnUrl]);
      //     },
      //     () => {
      //       this.loginForm.reset();
      //       this.loginForm.setErrors({
      //         invalidLogin: true
      //       });
      //     });
    }
  }

  setShoppingCart() {
    // this.cartService.setCart(this.authenticationService.oldUserId, this.userId)
    //   .subscribe((result: any) => {
    //     this.subscriptionService.cartItemcount$.next(result);
    //   }, (error: any) => {
    //     console.log('Error ocurred while setting shopping cart : ', error);
    //   });
  }

  setWishlist() {
    // this.wishlistService.getWishlistItems(this.userId).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
