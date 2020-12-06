import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestaurantService} from '../../../../services/restaurant.service';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {Restaurant} from '../../../../models/Restaurant';
import {Observable, Subject} from 'rxjs';
import {Host} from '../../../../enum/host.enum';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>()

  restaurant: Restaurant;
  avatarHost = `${Host.API_HOST}/images/restaurants`;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(params => params.id),
        switchMap(id => this.restaurantService.getByID(id)))
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((restaurant: Restaurant) => {
      console.log(restaurant);
      this.restaurant = restaurant;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
