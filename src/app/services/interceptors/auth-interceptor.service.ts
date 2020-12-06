import {Injectable} from '@angular/core';
import {AuthLocalService} from '../auth-local.service';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {API_Response} from '../../models/API_Response';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {


  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    public authLocalService: AuthLocalService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.isRefreshing);
    if (this.authLocalService.getAccessToken()) {
      request = this.addToken(request, this.authLocalService.getAccessToken());
    }
    return next.handle(request)
      .pipe(catchError(error => {
        // 401 Якщо токен не валідний шлемо рефреш.
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log(error);
          return this.handle401Error(request, next);
        } else if (error instanceof HttpErrorResponse && error.status === 403) {
          console.log(error);
          this.authLocalService.removeAuthData(); // Якщо токен видалено в базі то шле помилу щ отекен не знайдено і не видаляє дані removeAuthData().
          this.authLocalService.logout();
          return next.handle(request);
        } else {
          console.log(error);
          return throwError(error);
        }
      }));
  }

  private addToken(request: HttpRequest<any>, accessToken: string) {
    return request.clone({
      headers: request.headers.set('Authorization', accessToken)
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authLocalService.refreshTokens(this.authLocalService.getAccessToken()).pipe(
        switchMap((data: API_Response) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(data.msg.accessToken);
          return next.handle(this.addToken(request, data.msg.accessToken));
        }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(request, accessToken));
        }));
    }
  }
}
