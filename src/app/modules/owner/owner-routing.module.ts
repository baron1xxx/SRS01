import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OwnerComponent} from './components/owner/owner.component';
import {RestaurantsListComponent} from './components/restaurants-list/restaurants-list.component';
import {CommonModule} from '@angular/common';
import {StatisticRestaurantComponent} from './components/statistic-restaurant/statistic-restaurant.component';
import {MailComponent} from './components/mail/mail.component';
import {RestaurantComponent} from '../shared/Components/restaurant/restaurant.component';
import {TablesListComponent} from './components/tables-list/tables-list.component';
import {RestaurantDetailComponent} from './components/restaurant-detail/restaurant-detail.component';
import {UpdateRestaurantGuard} from '../../services/guards/canDeactivate/update-restaurant.guard';
import {InfoComponent} from '../shared/Components/info/info.component';
import {MenuListComponent} from '../shared/Components/menu/menu-list/menu-list.component';
import {MenuDetailComponent} from '../shared/Components/menu/menu-detail/menu-detail.component';



const routes: Routes = [
  {path: '', component: OwnerComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'restaurants'},
      {path: 'restaurants', component: RestaurantsListComponent},
      {path: 'restaurants/:id', component: RestaurantComponent,
      children: [
        {path: '', pathMatch: 'full', redirectTo: 'menu'},
        {path: 'menu', component: MenuListComponent,
          children: [
            // {path: ':id', component: DishesListComponent},
          ]
        },
        {path: 'menu/:id', component: MenuDetailComponent},
        {path: 'tables', component: TablesListComponent},
        {path: 'managers', component: TablesListComponent},
        {path: 'waiters', component: TablesListComponent},
        {path: 'cooks', component: TablesListComponent},
        {path: 'info', component: InfoComponent},
        {path: 'comments', component: TablesListComponent},
        {path: 'reservation', component: TablesListComponent},
      ]
      },
      {path: 'restaurants/:id/edit', component: RestaurantDetailComponent,
      canDeactivate: [UpdateRestaurantGuard]
      },
      {path: 'statistic', component: StatisticRestaurantComponent},
      {path: 'mail', component: MailComponent},
    ],
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
export class OwnerRoutingModule {
}
