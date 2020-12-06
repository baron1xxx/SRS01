import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../../../../../services/menu.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {MenuList} from '../../../../../models/MenuList';
import {Menu} from '../../../../../models/Menu';
import {Host} from '../../../../../enum/host.enum';
import {AuthLocalService} from '../../../../../services/auth-local.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  private menus: Array<Menu>;
  avatarHost = `${Host.API_HOST}/images/restaurants`;
  totalPage: number;

  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute,
    private authLocalService: AuthLocalService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.parent.params
      .pipe(
        switchMap(({id}) => this.menuService.getAllByRestaurantID(id)),
        takeUntil(this.unsubscribe$))
      .subscribe((menuList: MenuList) => {
        this.menus = menuList.menu;
        this.totalPage = menuList.totalPage;
      });
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
