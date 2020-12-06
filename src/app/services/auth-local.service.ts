import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, from} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Host} from '../enum/host.enum';
import {RegistrationData} from '../models/RegistrationData';
import {mergeMap, tap} from 'rxjs/operators';
import {API_Response} from '../models/API_Response';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {AuthMethod} from '../enum/authMethod.enum';
import {Roles} from '../enum/roles.enum';
import {LoginData} from '../models/LoginData';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthLocalService {

  private isAuthenticated = false;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private principal: User;
  private accessToken: string;
  private registrationData: RegistrationData;
  public roles = Roles;


  getIsAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }


  getPrincipal(): User {
    return this.principal;
  }


  constructor(
    private http: HttpClient,
    private router: Router,
    private authSocialService: AuthService
  ) {
  }

  registration(registrationData: RegistrationData): Observable<API_Response> {
    return this.http.post<API_Response>(`${Host.API_HOST}/auth/registration`, registrationData);
  }

  login(loginData: LoginData): Observable<API_Response> {
    return this.http.post<any>(`${Host.API_HOST}/auth/login`, loginData)
      .pipe(
        tap((data: API_Response) => {
          // TODO винести у функцію. Таке саме тут у гуглі і фесбуку.
          const token = data.msg.accessToken;
          if (token) {
            this.accessToken = token;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.saveAccessToken(token);
          }
          return data;
        }),
        mergeMap((data) => {
          return this.principalUser();
        })
      );
  }

  authGoogle(registrationData: RegistrationData): Observable<API_Response> {
    return this.http.post<API_Response>(`${Host.API_HOST}/auth/google`, registrationData)
      .pipe(tap((data: API_Response) => {
          const token = data.msg.accessToken;
          if (token) {
            this.accessToken = token;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.saveAccessToken(token);
          }
        })
      );
  }

  authFacebook(registrationData: RegistrationData): Observable<API_Response> {
    return this.http.post<API_Response>(`${Host.API_HOST}/auth/facebook`, registrationData)
      .pipe(tap((data: API_Response) => {
          const token = data.msg.accessToken;
          if (token) {
            this.accessToken = token;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.saveAccessToken(token);
          }
        })
      );
  }

  refreshTokens(accessToken: string): Observable<API_Response> {
    return this.http.post<API_Response>(`${Host.API_HOST}/auth/refresh`, accessToken)
      .pipe(tap((data: API_Response) => {
        console.log(data);
        if (data.success) {
          console.log(data.msg.accessToken);
          this.saveAccessToken(data.msg.accessToken);
        }
        return data;
      }));
  }

  principalUser(): Observable<API_Response> {
    console.log('principalUser');
    return this.http.get<API_Response>(`${Host.API_HOST}/auth/principal`)
      .pipe(tap((data: API_Response) => {
        if (data.success) {
          this.principal = data.msg;
          this.authStatusListener.next(true);
        }
      }));
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${Host.API_HOST}/auth/logout`)
      .pipe(
        tap(() => {
          this.removeAuthData();
        })
      );


  }

  activateAccount(activateToken: string): Observable<API_Response> {
    return this.http.get<API_Response>(`${Host.API_HOST}/auth/activate/${activateToken}`);
  }

  refreshActivateAccount(email: string): Observable<API_Response> {
    return this.http.post<API_Response>(`${Host.API_HOST}/auth/refreshActivate`, {email});
  }

  signInWithGoogle(): Observable<API_Response> {
    const googleRegistrationData = this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(user => {
        console.log(user);
        const {firstName, lastName, email, id: permissionCode} = user;
        // Create registrationData object.
        return this.registrationData = {
          firstName,
          lastName,
          email,
          permissionCode,
          authMethod: AuthMethod.GOOGLE,
          role: Roles.CUSTOMER
        };
      });
    return from(googleRegistrationData)
      .pipe(
        mergeMap((registrationData: RegistrationData) => {
          return this.authGoogle(registrationData);
        }),
        mergeMap(() => {
          return this.principalUser();
        })
      );
  }


  signInWithFB(): Promise<SocialUser> {
    return this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  signOutSocial(): void {
    this.authSocialService.signOut()
      .then(() => console.log('Logout success'));
  }

  removeAuthData(): void {
    this.signOutSocial();
    this.removeAccessToken();
    this.principal = null;
    this.authStatusListener.next(false);
    this.router.navigate(['auth', 'login']);
  }

  checkNavigateByRole(role): void {
    switch (role) {
      case Roles.OWNER:
        this.router.navigate(['owners']);
        break;

      case Roles.CUSTOMER:
        this.router.navigate(['customers']);
        break;

      case Roles.COOK:
        this.router.navigate(['cooks']);
        break;

      case Roles.WAITER:
        this.router.navigate(['waiters']);
        break;

      case Roles.MANAGER:
        this.router.navigate(['managers']);
        break;
    }
  }

  saveAccessToken(accessToken: string): void {
    localStorage.setItem('_accessToken', accessToken);
  }

  getAccessToken(): string {
    return localStorage.getItem('_accessToken');
  }

  removeAccessToken(): void {
    localStorage.removeItem('_accessToken');
  }
}
