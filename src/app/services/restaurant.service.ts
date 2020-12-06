import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Host} from '../enum/host.enum';
import {map, tap} from 'rxjs/operators';
import {API_Response} from '../models/API_Response';
import {Restaurant} from '../models/Restaurant';
import {BehaviorSubject, Observable} from 'rxjs';
import {RestaurantsList} from '../models/RestaurantsList';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurantStatusListener = new BehaviorSubject<any>('');

  constructor(
    private http: HttpClient
  ) {
  }

  getRestaurantStatusListener(): Observable<boolean> {
    return this.restaurantStatusListener.asObservable();
  }

  create(restaurantDta: FormData) {
    return this.http.post<API_Response>(`${Host.API_HOST}/restaurants`, restaurantDta)
      .pipe(
        map((data: API_Response) => {
          console.log(data);
          if (data.success) {
            const restaurant: Restaurant = data.msg;
            this.restaurantStatusListener.next('');
            return restaurant;
          }
        })
      );
  }

  getByID(id: number): Observable<Restaurant> {
    return this.http.get<API_Response>(`${Host.API_HOST}/restaurants/${id}`)
      .pipe(
        map((data: API_Response) => {
          const restaurant: Restaurant = data.msg;
          return restaurant;
        })
      );
  }

  getAllByUserID(): Observable<RestaurantsList> {
    return this.http.get<API_Response>(`${Host.API_HOST}/restaurants/byUserId`)
      .pipe(
        map((data: API_Response) => {
          const restaurants: RestaurantsList = data.msg;
          return restaurants;
        })
      );
  }

  getAll(limit = 10, page = 1): Observable<RestaurantsList> {
    return this.http.get<API_Response>(`${Host.API_HOST}/restaurants?limit=${limit}&page=${page}`)
      .pipe(
        map((data: API_Response) => {
          const restaurants: RestaurantsList = data.msg;
          return restaurants;
        })
      );
  }

  getAllByUserIDByName(limit: number, page: number, name: string): Observable<RestaurantsList> {
    return this.http.get<API_Response>(`${Host.API_HOST}/restaurants/byUserIdByName?limit=${limit}&page=${page}&name=${name}`)
      .pipe(
        map((data: API_Response) => {
          const restaurants: RestaurantsList = data.msg;
          return restaurants;
        })
      );
  }

  update(id: number, restaurant: Restaurant): Observable<API_Response> {
    return this.http.put<API_Response>(`${Host.API_HOST}/restaurants/${id}`, restaurant)
      .pipe(
        tap(() => this.restaurantStatusListener.next(''))
      );
  }

  updateAvatar(id: number, avatarFormData: FormData): Observable<API_Response> {
    return this.http.put<API_Response>(`${Host.API_HOST}/restaurants/${id}/avatar`, avatarFormData)
      .pipe(
        tap(() => this.restaurantStatusListener.next(''))
      );
  }

  delete(id: number): Observable<API_Response> {
    return this.http.delete<API_Response>(`${Host.API_HOST}/restaurants/${id}`)
      .pipe(
        tap(() => this.restaurantStatusListener.next(''))
      );
  }
}
