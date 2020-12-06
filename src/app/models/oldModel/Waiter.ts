import {User} from '../User';

export interface Waiter {
  id: number;
  user_id: number;
  restaurant_id: number;
  user: User;
}

