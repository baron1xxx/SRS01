import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {Restaurant} from '../../../../models/Restaurant';
import {RestaurantService} from '../../../../services/restaurant.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();
  private restaurant: Restaurant;
  private latitude: number;
  private longitude: number;
  private markerLabel: string;

  constructor(
    private  activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => console.log(params));
    this.activatedRoute.parent.params
      .pipe(
        map(params => params.id),
        switchMap(id => this.restaurantService.getByID(id)))
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((restaurant: Restaurant) => {
        console.log(restaurant);
        this.restaurant = restaurant;
        this.latitude = restaurant.geoLocation.latitude;
        this.longitude = restaurant.geoLocation.longitude;
        this.markerLabel = restaurant.name;
      });
  }

}
