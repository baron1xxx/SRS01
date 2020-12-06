import {CartItem} from './CartItem';

export interface Order {
  id: number;
  user_id: number;
  restaurant_id: number;
  table: number;
  orderItems: Array<CartItem>;
  order_total_price: number;
  order_status_code: string;
}
