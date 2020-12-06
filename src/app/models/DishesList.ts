import {Dish} from './Dish';

export interface DishesList {
  dishes: Array<Dish>;
  totalPage?: number;
}
