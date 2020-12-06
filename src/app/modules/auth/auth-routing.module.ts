import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthPageComponent} from './Components/auth-page/auth-page.component';
import {RegistrationComponent} from './Components/registration/registration.component';
import {LoginComponent} from './Components/login/login.component';
import {ActivateComponent} from './Components/activate/activate.component';

const routes: Routes = [
  {path: '', component: AuthPageComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'registration', component: RegistrationComponent},
      {path: 'login', component: LoginComponent},
    ],
  },
  {path: 'activate/:activateToken', component: ActivateComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
