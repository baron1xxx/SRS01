import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WaiterComponent} from './components/waiter/waiter.component';

const routes: Routes = [
  {
    path: '', component: WaiterComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WaiterRoutingModule { }
