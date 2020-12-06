import {GeoLocation} from './GeoLocation ';
import {Address} from './Address';

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  avatar: string;
  tel: string;
  city: string;
  isOpen: boolean;
  userId: number;
  address: Address;
  geoLocation: GeoLocation;
  // table?: Array<Table>;
  // waiter?: Array<User>;
  // cook?: Array<User>;
}
