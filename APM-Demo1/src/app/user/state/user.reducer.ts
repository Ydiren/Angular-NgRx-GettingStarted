import * as fromUser from '../state/user.state';
import { UserAction } from './user.actions';

export function reducer(state = fromUser.initialState, action: UserAction) {
  //   switch (action.type) {
  //     case 'MASK_USER_NAME':
  //       return {
  //         ...state,
  //         maskUserName: action.payload
  //       };

  //     default:
  //       return state;
  //   }
  if (action.execute) {
    return action.execute(state);
  }

  return state;
}
