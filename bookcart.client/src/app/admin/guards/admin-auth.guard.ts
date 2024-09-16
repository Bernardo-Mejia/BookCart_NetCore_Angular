import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivateFn,
  CanActivateChildFn,
  CanLoadFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../../home/interfaces/IUser.interface';
import { SubscriptionService } from '../../auth/services/subscription.service';
import { IUserType } from '../../home/interfaces/IUserTypes.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements OnDestroy {
  private userDataSubscription: Subscription;
  private userData = new IUser();

  constructor(
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {
    this.userDataSubscription = this.subscriptionService.userData
      .asObservable()
      .subscribe((data) => {
        this.userData = data;
      });
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree => {
    if (this.userData.userTypeId === IUserType.admin) {
      return true;
    }
    return this.router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
  };

  canActivateChild: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree => {
    const canActivateResult = this.canActivate(route, state);

    // Si `canActivateResult` es un Observable o Promesa, debes manejarlo de forma adecuada
    if (
      canActivateResult instanceof Observable ||
      canActivateResult instanceof Promise
    ) {
      // Aquí se manejarían estos casos si se da el caso de que sea observable o promesa
      // Pero, para este caso particular, asumimos que retorna solo boolean | UrlTree sincrónicamente
      throw new Error('El valor debe ser sincrónico: boolean o UrlTree.');
    }

    return canActivateResult;
  };

  canLoad: CanLoadFn = (route: Route): boolean | UrlTree => {
    const url = `/${route.path}`;
    if (this.userData.userTypeId === IUserType.admin) {
      return true;
    }
    return this.router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: url },
    });
  };
}
