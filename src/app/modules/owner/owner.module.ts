import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './components/owner/owner.component';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import {OwnerRoutingModule} from './owner-routing.module';
import { StatisticRestaurantComponent } from './components/statistic-restaurant/statistic-restaurant.component';
import { SummaryStatisticsComponent } from './components/summary-statistics/summary-statistics.component';
import { MailComponent } from './components/mail/mail.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { TableComponent } from './components/table/table.component';
import { TablesListComponent } from './components/tables-list/tables-list.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { DishesListComponent } from './components/dishes-list/dishes-list.component';

@NgModule({
  declarations: [
    OwnerComponent,
    RestaurantsListComponent,
    StatisticRestaurantComponent,
    SummaryStatisticsComponent,
    MailComponent,
    AddRestaurantComponent,
    TableComponent,
    TablesListComponent,
    RestaurantDetailComponent,
    DishesListComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class OwnerModule { }
