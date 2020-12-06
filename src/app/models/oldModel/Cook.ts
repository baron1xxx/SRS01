import {User} from '../User';

export interface Cook {
  id: number;
  user_id: number;
  restaurant_id: number;
  user: User;
}

