import {Dish} from '../Dish';

export interface CartItem {
  dishID: number;
  dishName: string;
  dishDescription: string;
  dishAvatar: string;
  dishPrice: number;
  dishQuantity: number;
  dishTotalPrice: number;

  order_item_status_code?: string;
  order_item_quantity?: number;
  order_item_total_price?: number;
  dish?: Dish;
}
