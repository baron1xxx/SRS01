import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_Response} from '../models/API_Response';
import {Host} from '../enum/host.enum';
import {map} from 'rxjs/operators';
import {MenuList} from '../models/MenuList';
import {Dish} from '../models/Dish';
import {DishesList} from '../models/DishesList';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private dishStatusListener = new BehaviorSubject<any>('');

  constructor(
    private http: HttpClient
  ) { }

  getDishStatusListener(): Observable<boolean> {
    return this.dishStatusListener.asObservable();
  }

  create(dishDta: FormData) {
    return this.http.post<API_Response>(`${Host.API_HOST}/dishes`, dishDta)
      .pipe(
        map((data: API_Response) => {
          console.log(data);
          if (data.success) {
            const dish: Dish = data.msg;
            this.dishStatusListener.next('');
            return dish;
          }
        })
      );
  }

  getAllByMenuID(menuId: number): Observable<DishesList> {
    return this.http.get<API_Response>(`${Host.API_HOST}/dishes/byMenuId/${menuId}`)
      .pipe(
        map((data: API_Response) => {
          const dishesList: DishesList = data.msg;
          return dishesList;
        })
      );
  }
}
