import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthLocalService} from '../../auth-local.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverPrincipalGuard implements Resolve<Observable<any>> {
  constructor(
    private authLocalService: AuthLocalService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    console.log('ResolverPrincipalGuard  WORK!!!!');
    return this.authLocalService.principalUser();
  }

}
