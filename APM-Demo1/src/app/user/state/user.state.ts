import * as fromRoot from '../../state/app.state';
import { User } from '../user';

export interface State extends fromRoot.State {
  user: UserState;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

export const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};
