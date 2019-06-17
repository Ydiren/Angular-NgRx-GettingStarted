import * as fromUser from '../state/user.state';
import { UserAction, UserActionTypes } from './user.actions';

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
  if (action instanceof UserAction) {
    console.log('user action type', action);

    return action.execute(state);
  }

  return state;
}
