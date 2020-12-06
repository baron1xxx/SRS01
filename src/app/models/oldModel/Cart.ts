import {CartItem} from './CartItem';


export interface Cart {
  items: Array<CartItem>;
  totalQuantity: number;
  totalPrice: number;
  user: number;
  restaurantId: number;
  table: number;
}
