import {Restaurant} from './Restaurant';

export interface RestaurantsList {
  restaurants: Array<Restaurant>;
  totalPage?: number;
}
