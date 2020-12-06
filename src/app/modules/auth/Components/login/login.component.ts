import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginData} from '../../../../models/LoginData';
import {AuthMethod} from '../../../../enum/authMethod.enum';
import {Subject} from 'rxjs';
import {API_Response} from '../../../../models/API_Response';
import {AuthLocalService} from '../../../../services/auth-local.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  private loginForm: FormGroup = new FormGroup({
    email: new FormControl(null,
      [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$')
      ]),
    permissionCode: new FormControl(null,
      [
        Validators.required
      ])
  });

  private loginData: LoginData;
  private errorMessage: string;


  constructor(
    private authLocalService: AuthLocalService,
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    const {email, permissionCode} = this.loginForm.value;
    this.loginData = {
      email,
      permissionCode,
      authMethod: AuthMethod.LOCAL
    };
    this.authLocalService.login(this.loginData)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((data: API_Response) => {
        console.log(data);
        if (data.success) {
          const {role} = data.msg;
          this.authLocalService.checkNavigateByRole(role);
        }
      },
      (e) => {
        console.log(e.error);
        this.errorMessage = e.error.msg.message || e.error.msg;
      });

  }

  signInWithGoogle(): void {
    this.authLocalService.signInWithGoogle()
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe((data: API_Response) => {
          console.log(data);
          if (data.success) {
            this.errorMessage = '';
            this.authLocalService.checkNavigateByRole(data.msg.role);
          }
        },
        (e) => {
          console.log(e.error);
          this.errorMessage = e.error.msg.message || e.error.msg;
        });
  }

  signInWithFB(): void {

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}


