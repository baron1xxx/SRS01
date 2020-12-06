import {User} from '../User';

export interface Manager {
  id: number;
  user_id: number;
  restaurant_id: number;
  user: User;
}

