import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from '../../../../services/restaurant.service';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {Restaurant} from '../../../../models/Restaurant';
import {forkJoin, Observable, of, Subject} from 'rxjs';
import {GeoLocationService} from '../../../../services/geo-location.service';
import {GeoLocation} from '../../../../models/GeoLocation ';
import {Host} from '../../../../enum/host.enum';
import {RestaurantsList} from '../../../../models/RestaurantsList';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  addRestaurantIsClicked = false;
  restaurants: Array<Restaurant>;
  geoLocation: GeoLocation;
  avatarHost = `${Host.API_HOST}/images/restaurants`;
  totalPage: number;

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
          return this.restaurantService.getAllByUserID();
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
