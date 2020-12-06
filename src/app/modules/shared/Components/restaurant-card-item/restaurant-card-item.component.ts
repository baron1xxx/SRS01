import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Restaurant} from '../../../../models/Restaurant';
import {GeoLocation} from '../../../../models/GeoLocation ';
import {GeoLocationService} from '../../../../services/geo-location.service';
import {Observable, Subject} from 'rxjs';
import {RestaurantService} from '../../../../services/restaurant.service';
import {API_Response} from '../../../../models/API_Response';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthLocalService} from '../../../../services/auth-local.service';
import {Roles} from '../../../../enum/roles.enum';

@Component({
  selector: 'app-restaurant-card-item',
  templateUrl: './restaurant-card-item.component.html',
  styleUrls: ['./restaurant-card-item.component.css']
})
export class RestaurantCardItemComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  @Input() restaurant: Restaurant;
  @Input() currentPosition: GeoLocation;
  @Input() avatarHost: string;
  distance: Observable<string>;
  Roles: Roles;

  constructor(
    private authLocalService: AuthLocalService,
    private geoLocationService: GeoLocationService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.distance = this.geoLocationService.distanceMatrix(
      `${this.currentPosition.latitude},${this.currentPosition.longitude}`,
      `${this.restaurant.geoLocation.latitude},${this.restaurant.geoLocation.longitude}`
    );
  }

  deleteRestaurant(id: number): void {
    this.restaurantService.delete(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: API_Response) => {
      console.log(data);
      if (data.success) {
        alert(data.msg);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // navigateRestaurantId(id: number) {
  //   this.router.navigate(['owners', 'restaurants', id]);
  // }
}
