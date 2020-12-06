import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {Host} from '../../../../enum/host.enum';
import {Dish} from '../../../../models/Dish';
import {switchMap, takeUntil} from 'rxjs/operators';
import {DishService} from '../../../../services/dish.service';
import {DishesList} from '../../../../models/DishesList';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.css']
})
export class DishesListComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  private dishes: Array<Dish>;
  avatarHost = `${Host.API_HOST}/images/restaurants`;
  totalPage: number;

  constructor(
    private dishService: DishService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.dishService.getAllByMenuID(id)),
        takeUntil(this.unsubscribe$))
      .subscribe((dishesList: DishesList) => {
        this.dishes = dishesList.dishes;
        this.totalPage = dishesList.totalPage;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
