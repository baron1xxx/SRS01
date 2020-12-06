import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestaurantCardItemComponent} from './Components/restaurant-card-item/restaurant-card-item.component';
import {RatingModule} from 'ng-starrating';
import {SelectOptionComponent} from './Components/select-option/select-option.component';
import {RouterModule} from '@angular/router';
import {RestaurantComponent} from './Components/restaurant/restaurant.component';
import {ModalWindowComponent} from './Components/modal-window/modal-window.component';
import { InfoComponent } from './Components/info/info.component';
import {AgmCoreModule} from '@agm/core';
import { MenuListComponent } from './Components/menu/menu-list/menu-list.component';
import { MenuCardComponent } from './Components/menu/menu-card/menu-card.component';
import { AddMenuComponent } from './Components/menu/add-menu/add-menu.component';
import { DishCardItemComponent } from './Components/dish-card-item/dish-card-item.component';
import { DishComponent } from './Components/dish/dish.component';
import { MenuDetailComponent } from './Components/menu/menu-detail/menu-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UpdateAvatarComponent } from './Components/update-avatar/update-avatar.component';

@NgModule({
  declarations: [
    RestaurantCardItemComponent,
    SelectOptionComponent,
    RestaurantComponent,
    ModalWindowComponent,
    InfoComponent,
    MenuListComponent,
    MenuCardComponent,
    AddMenuComponent,
    DishCardItemComponent,
    DishComponent,
    MenuDetailComponent,
    UpdateAvatarComponent
  ],
  entryComponents: [
    UpdateAvatarComponent
  ],
  imports: [
    CommonModule,
    RatingModule,
    RouterModule,
    AgmCoreModule,
    ReactiveFormsModule
  ],
  exports: [
    RestaurantCardItemComponent,
    SelectOptionComponent,
    ModalWindowComponent
  ]
})
export class SharedModule {
}
