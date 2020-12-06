import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { AuthPageComponent } from './Components/auth-page/auth-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import { ActivateComponent } from './Components/activate/activate.component';
import {SharedModule} from '../shared/shared.module';




@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthPageComponent,
    ActivateComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
