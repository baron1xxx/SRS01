import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { InsertionDirective } from './insertion.directive';

@NgModule({
  declarations: [ModalContainerComponent, InsertionDirective],
  entryComponents: [ModalContainerComponent],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
