import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Router} from '@angular/router';
import {AuthLocalService} from '../../auth-local.service';
import {catchError, map} from 'rxjs/operators';
import {API_Response} from '../../../models/API_Response';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authLocalService: AuthLocalService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Якщо  користувач залогіненийб він не зможе перейти на роут де є цей гуард(/auth).
    // І якщо він залогінений, перенапрявляю по "role" на його роут.
    if (this.authLocalService.getIsAuthenticated()) {
      // Запит на сервер, тому що при перезагрузці сторінки principal в AuthLocalService ще нема (асинхронна загрузка)
      return this.authLocalService.principalUser()
        .pipe(
          map((data: API_Response) => {
            const principal = data.msg;
            this.authLocalService.checkNavigateByRole(principal.role);
            return !this.authLocalService.getIsAuthenticated();
          }),
          catchError(err => {
            return of (false);
          })
        );
    }
    return of (!this.authLocalService.getIsAuthenticated());
  }
  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
