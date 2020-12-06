import {Order} from './Order';

export interface Table {
  id: number;
  number: number;
  restaurant_id: number;
  waiter_id?: number;
  orders?: Array<Order>;
}
