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
import {Observable, of} from 'rxjs';
import {AuthLocalService} from '../../auth-local.service';
import {catchError, map} from 'rxjs/operators';
import {API_Response} from '../../../models/API_Response';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authLocalService: AuthLocalService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(next);
    const expectedRoles = [...next.data.expectedRoles];
    console.log(expectedRoles);
    return expectedRoles.indexOf(this.authLocalService.getPrincipal().role) > -1;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authLocalService.principalUser()
      .pipe(
        map((data: API_Response) => {
          const principal = data.msg;
          console.log(principal);
          const expectedRoles = [...route.data.expectedRoles];
          console.log(expectedRoles);
          console.log(expectedRoles.includes(principal.role));
          return expectedRoles.includes(principal.role);
        }),
        catchError(err => {
          return of (false);
        })
      );
  }
}
