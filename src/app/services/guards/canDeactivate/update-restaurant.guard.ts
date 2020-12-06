import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {RestaurantDetailComponent} from '../../../modules/owner/components/restaurant-detail/restaurant-detail.component';


@Injectable({
  providedIn: 'root'
})
export class UpdateRestaurantGuard implements CanDeactivate<RestaurantDetailComponent> {
  canDeactivate(component: RestaurantDetailComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.editRestaurant.dirty && !component.isUpdated ? confirm('Are you serious') : true;
  }
}
