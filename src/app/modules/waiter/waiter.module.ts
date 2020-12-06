import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterComponent } from './components/waiter/waiter.component';
import {WaiterRoutingModule} from './waiter-routing.module';

@NgModule({
  declarations: [
    WaiterComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule
  ]
})
export class WaiterModule { }
