import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationData} from '../../../../models/RegistrationData';
import {Roles} from '../../../../enum/roles.enum';
import {AuthLocalService} from '../../../../services/auth-local.service';
import {API_Response} from '../../../../models/API_Response';
import {AuthMethod} from '../../../../enum/authMethod.enum';
import {Router} from '@angular/router';
import {AuthService} from 'angularx-social-login';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl(null,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Zа-яА-Я\\s]+$')
      ]),
    lastName: new FormControl(null,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Zа-яА-Я\\s]+$')
      ]),
    permissionCode: new FormControl(null,
      [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$')
      ]),
    email: new FormControl(null,
      [
        Validators.required,
        Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
      ]),
    role: new FormControl(false)
  });

  private unsubscribe: Subject<void> = new Subject<void>();

  private registrationData: RegistrationData;
  private errorMessage: string;
  private successMessage: string;

  constructor(
    private authLocalService: AuthLocalService,
    private authSocialService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  registration(): void {
    // Get registration field from FormGroup.
    const {firstName, lastName, email, permissionCode} = this.registrationForm.value;
    // Check and set role.
    let {role} = this.registrationForm.value;
    if (role) {
      role = Roles.OWNER;
    } else {
      role = Roles.CUSTOMER;
    }
    // Create registrationData object.
    this.registrationData = {
      firstName,
      lastName,
      authMethod: AuthMethod.LOCAL,
      email,
      permissionCode,
      role
    };
    // Send request and handle response.
    this.authLocalService.registration(this.registrationData)
      .pipe(
        takeUntil(this.unsubscribe)
      ).subscribe((data: API_Response) => {
        if (data.success) {
          this.successMessage = data.msg;
          this.registrationForm.reset();
          this.errorMessage = '';
        }
      },
      (e) => {
        console.log(e);
        this.errorMessage = e.error.msg.message || e.error.msg;
      });
  }

  signInWithGoogle(): void {
    this.authLocalService.signInWithGoogle()
      .pipe(
        takeUntil(this.unsubscribe))
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


  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
