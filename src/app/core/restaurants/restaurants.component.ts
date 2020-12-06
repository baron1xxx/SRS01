import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subject} from 'rxjs';
import {Restaurant} from '../../models/Restaurant';
import {GeoLocation} from '../../models/GeoLocation ';
import {Host} from '../../enum/host.enum';
import {RestaurantService} from '../../services/restaurant.service';
import {GeoLocationService} from '../../services/geo-location.service';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {RestaurantsList} from '../../models/RestaurantsList';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit, OnDestroy {


  private unsubscribe$: Subject<void> = new Subject<void>();

  private addRestaurantIsClicked = false;
  private restaurants: Array<Restaurant>;
  private geoLocation: GeoLocation;
  private avatarHost = `${Host.API_HOST}/images/restaurants`;
  private totalPage: number;

  constructor(
    private restaurantService: RestaurantService,
    private geoLocationService: GeoLocationService
  ) {
  }

  ngOnInit() {
    this.restaurantService.getRestaurantStatusListener()
      .pipe(
        switchMap((data) => {
          console.log('getRestaurantStatusListener WORK!!!');
          return this.restaurantService.getAll();
        }),
        catchError(err => {
          console.log(err);
          return of([]);
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe((data: RestaurantsList) => {
      this.restaurants = data.restaurants;
      this.totalPage = data.totalPage;
    });

    this.geoLocationService.getCurrentPosition()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((geolocation) => {
      this.geoLocation = {
        latitude: geolocation.coords.latitude,
        longitude: geolocation.coords.longitude
      };
    });
  }

  addRestaurantClicked() {
    this.addRestaurantIsClicked = !this.addRestaurantIsClicked;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
