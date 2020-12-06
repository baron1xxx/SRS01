import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthLocalService} from '../../../../services/auth-local.service';
import {API_Response} from '../../../../models/API_Response';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  private activateToken: string;
  private errorMessage: string;
  private successMessage: string;
  private validActivateUrl: boolean;

  activateEmail: FormGroup = new FormGroup({
    email: new FormControl(null,
      [
        Validators.required,
        Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
      ])
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authLocalService: AuthLocalService
  ) {
  }

  ngOnInit() {
    this.activateToken = this.activatedRoute.snapshot.params.activateToken;
    this.authLocalService.activateAccount(this.activateToken).subscribe((data: API_Response) => {
        console.log(data);
        if (data.success) {
          this.successMessage = data.msg;
          this.errorMessage = '';
          this.validActivateUrl = true;
        }
      },
      (e) => {
        console.log(e);
        const notValidLink = e.error.msg.split('.')[0];
        if (notValidLink === 'Not valid activate link') {
          this.validActivateUrl = false;
        } else {
          this.validActivateUrl = true;
        }
        this.errorMessage = e.error.msg.message || e.error.msg;
      });
  }


  sendEmail() {
    const {email} = this.activateEmail.value;
    this.authLocalService.refreshActivateAccount(email).subscribe((data: API_Response) => {
        console.log(data);
        if (data.success) {
          this.successMessage = data.msg;
          this.errorMessage = '';
          this.validActivateUrl = true;
        }
      },
      (e) => {
        console.log(e);
        const notValidLink = e.error.msg.split('.')[0];
        if (notValidLink === 'Not valid activate link') {
          this.validActivateUrl = false;
        } else {
          this.validActivateUrl = true;
        }
        this.errorMessage = e.error.msg.message || e.error.msg;
      });
  }
}
