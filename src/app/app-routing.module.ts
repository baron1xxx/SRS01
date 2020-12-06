import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './core/about/about.component';
import {ContactsComponent} from './core/contacts/contacts.component';
import {RestaurantsComponent} from './core/restaurants/restaurants.component';
import {Roles} from './enum/roles.enum';
import {NotForOwnersAndStaffGuard} from './services/guards/roleGuards/not-for-owners-and-staff.guard';
import {NotAuthGuard} from './services/guards/authGuards/not-auth.guard';
import {AuthGuard} from './services/guards/authGuards/auth.guard';
import {RoleGuard} from './services/guards/roleGuards/role.guard';
import {RestaurantComponent} from './modules/shared/Components/restaurant/restaurant.component';
import {InfoComponent} from './modules/shared/Components/info/info.component';



const routes: Routes = [
  {
    path: '', component: AboutComponent,
    canActivate: [NotForOwnersAndStaffGuard],
    data: {
      expectedRoles: [Roles.OWNER, Roles.MANAGER, Roles.WAITER, Roles.COOK]
    }
  },
  {
    path: 'restaurants', component: RestaurantsComponent,
    canActivate: [NotForOwnersAndStaffGuard],
    data: {
      expectedRoles: [Roles.OWNER, Roles.MANAGER, Roles.WAITER, Roles.COOK]
    },
    children: [
      // {path: 'restaurants/:id', component: RestaurantComponent}
    ]
  },
  {path: 'restaurants/:id', component: RestaurantComponent,
    children: [
      {path: 'info', component: InfoComponent}
    ]},
  {
    path: 'contacts', component: ContactsComponent,
    canActivate: [NotForOwnersAndStaffGuard],
    data: {
      expectedRoles: [Roles.OWNER, Roles.MANAGER, Roles.WAITER, Roles.COOK]
    }
  },
  {
    path: 'auth', loadChildren: () => import ('./modules/auth/auth.module').then(m => m.AuthModule),
    canLoad: [NotAuthGuard]
  },
  {
    path: 'customers', loadChildren: () => import ('./modules/customer/customer.module').then(m => m.CustomerModule),
    data: {
      expectedRoles: [Roles.CUSTOMER, Roles.ADMIN]
    },
    canLoad: [AuthGuard, RoleGuard]
  },
  {
    path: 'owners', loadChildren: () => import('./modules/owner/owner.module').then((m => m.OwnerModule)),
    data: {
      expectedRoles: [Roles.OWNER, Roles.ADMIN]
    },
    canLoad: [AuthGuard, RoleGuard]
  },
  {
    path: 'cooks', loadChildren: () => import('./modules/cook/cook.module').then((m => m.CookModule)),
    data: {
      expectedRoles: [Roles.COOK, Roles.ADMIN]
    },
    canLoad: [AuthGuard, RoleGuard]
  },
  {
    path: 'waiters', loadChildren: () => import('./modules/waiter/waiter.module').then((m => m.WaiterModule)),
    data: {
      expectedRoles: [Roles.WAITER, Roles.ADMIN]
    },
    canLoad: [AuthGuard, RoleGuard]
  },
  {
    path: 'managers', loadChildren: () => import('./modules/manager/manager.module').then((m => m.ManagerModule)),
    data: {
      expectedRoles: [Roles.MANAGER, Roles.ADMIN]
    },
    canLoad: [AuthGuard, RoleGuard]
  },
  {
    path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then((m => m.CartModule)),
    data: {
      expectedRoles: [Roles.CUSTOMER, Roles.ADMIN]
    },
    canLoad: [AuthGuard, RoleGuard]
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {

}
