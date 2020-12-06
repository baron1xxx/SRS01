import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthLocalService} from '../../auth-local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authLocalService: AuthLocalService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const isAuth: boolean = this.authLocalService.getIsAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
  canLoad(): boolean {
    return this.canActivate();
  }
}
