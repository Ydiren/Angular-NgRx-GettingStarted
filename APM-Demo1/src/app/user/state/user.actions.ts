import { Action } from '@ngrx/store';
import { UserState } from './user.state';

export enum UserActionTypes {
  MaskUserName = '[User] Mask User Name'
}

export abstract class UserAction implements Action {
  abstract type: string;
  abstract execute(state: UserState): UserState;
}

export class MaskUserName extends UserAction {
  readonly type = UserActionTypes.MaskUserName;

  constructor(public payload: boolean) {
    super();
  }

  execute(state: UserState) {
    return {
      ...state,
      maskUserName: this.payload
    } as UserState;
  }
}
