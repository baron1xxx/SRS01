import {Region} from './Region';
import {Street} from './Street';
import {City} from './City';
import {HouseNumber} from './HouseNumber';



export interface Address {
  id: number;
  region: Region;
  city: City;
  street: Street;
  houseNumber: HouseNumber;
}
