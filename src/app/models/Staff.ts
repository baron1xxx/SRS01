import {User} from './User';

export interface Staff {
  id: number;
  user_id: number;
  restaurant_id: number;
  user: User;
}

