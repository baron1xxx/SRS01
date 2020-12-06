import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {API_Response} from '../models/API_Response';
import {Host} from '../enum/host.enum';
import {map, tap} from 'rxjs/operators';
import {Menu} from '../models/Menu';
import {RestaurantsList} from '../models/RestaurantsList';
import {MenuList} from '../models/MenuList';
import {Restaurant} from '../models/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuStatusListener = new BehaviorSubject<any>('');

  constructor(
    private http: HttpClient
  ) { }

  getMenuStatusListener(): Observable<boolean> {
    return this.menuStatusListener.asObservable();
  }

  create(menuDta: FormData) {
    return this.http.post<API_Response>(`${Host.API_HOST}/menu`, menuDta)
      .pipe(
        map((data: API_Response) => {
          console.log(data);
          if (data.success) {
            const menu: Menu = data.msg;
            this.menuStatusListener.next('');
            return menu;
          }
        })
      );
  }

  getByID(id: number): Observable<Menu> {
    return this.http.get<API_Response>(`${Host.API_HOST}/menu/${id}`)
      .pipe(
        map((data: API_Response) => {
          const menu: Menu = data.msg;
          return menu;
        })
      );
  }

  getAllByRestaurantID(restaurantId: number): Observable<MenuList> {
    return this.http.get<API_Response>(`${Host.API_HOST}/menu/byRestaurantId/${restaurantId}`)
      .pipe(
        map((data: API_Response) => {
          const menuList: MenuList = data.msg;
          return menuList;
        })
      );
  }

  updateAvatar(id: number, avatarFormData: FormData): Observable<API_Response> {
    return this.http.put<API_Response>(`${Host.API_HOST}/menu/${id}/avatar`, avatarFormData)
      .pipe(
        tap(() => this.menuStatusListener.next(''))
      );
  }

}
