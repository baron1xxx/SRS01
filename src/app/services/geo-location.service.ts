import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {API_Response} from '../models/API_Response';
import {Host} from '../enum/host.enum';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(
    private http: HttpClient
  ) { }

  getCurrentPosition(): Observable<any> {
    return new Observable(observer => {
      navigator.geolocation.getCurrentPosition(
        success => {
          observer.next(success);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  distanceMatrix(origins: string, destinations: string): Observable<any> {
    return this.http.get<API_Response>(`${Host.API_HOST}/maps/distance?origins=${origins}&destinations=${destinations}`)
      .pipe(
        map((data: API_Response) => {
          return data.msg.distance.text;
        })
      );
  }
}
