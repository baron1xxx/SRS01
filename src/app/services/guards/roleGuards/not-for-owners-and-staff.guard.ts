import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {API_Response} from '../../../models/API_Response';
import {AuthLocalService} from '../../auth-local.service';
import {Roles} from '../../../enum/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class NotForOwnersAndStaffGuard implements CanActivate {

  constructor(
    private authLocalService: AuthLocalService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authLocalService.getIsAuthenticated()) {
      return this.authLocalService.principalUser()
        .pipe(
          map((data: API_Response) => {
            const principal = data.msg;
            console.log(principal);
            const expectedRoles = [...next.data.expectedRoles];
            if (principal.role !== Roles.CUSTOMER) {
              this.authLocalService.checkNavigateByRole(principal.role);
            }
            return !expectedRoles.includes(principal.role);
          }),
          catchError(err => {
            return of (false);
          })
        );
    } else {
      return of (true);
    }
}

}
