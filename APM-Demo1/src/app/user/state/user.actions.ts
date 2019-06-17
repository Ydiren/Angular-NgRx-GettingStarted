import { Action } from '@ngrx/store';
import { UserState } from './user.state';

export enum UserActionTypes {
  MaskUserName = '[User] Mask User Name'
}

export interface UserAction extends Action {
  execute(state: UserState): UserState;
}

export class MaskUserName implements UserAction {
  readonly type = UserActionTypes.MaskUserName;

  constructor(public payload: boolean) {}

  execute(state: UserState) {
    return {
      ...state,
      maskUserName: this.payload
    } as UserState;
  }
}
