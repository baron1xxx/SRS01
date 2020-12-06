import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Host} from '../enum/host.enum';
import {map, take} from 'rxjs/operators';
import {API_Response} from '../models/API_Response';
import {Region} from '../models/Region';
import {City} from '../models/City';
import {Street} from '../models/Street';
import {Observable} from 'rxjs';

class HouseNumber {
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private regions: Array<Region>;
  private cities: Array<City>;
  private streets: Array<Street>;
  private houseNumbers: Array<HouseNumber>;


  constructor(
    private http: HttpClient
  ) {
  }

  getRegion(region: string): Observable<Array<Region>> {
    return this.http.get<API_Response>(`${Host.API_HOST}/address/region?region=${region}`)
      .pipe(
        map((data: API_Response) => {
          console.log(data);
          this.regions = data.msg;
          return this.regions;
        })
      );
  }

  getCity(regionId: number, city: string): Observable<Array<City>> {
    return this.http.get<API_Response>(`${Host.API_HOST}/address/city?regionId=${regionId}&city=${city}`)
      .pipe(
        map((data: API_Response) => {
          console.log(data);
          this.cities = data.msg;
          return this.cities;
        })
      );
  }

  getStreet(regionId: number, cityId: number, street: string): Observable<Array<Street>> {
    return this.http.get<API_Response>(`${Host.API_HOST}/address/street?regionId=${regionId}&cityId=${cityId}&street=${street}`)
      .pipe(
        map((data: API_Response) => {
          console.log(data);
          this.streets = data.msg;
          return this.streets;
        })
      );
  }

}
