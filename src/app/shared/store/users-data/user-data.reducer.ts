import { Action, createReducer, on } from '@ngrx/store';

import * as mainActions from './user-data.actions'
import { IUser } from '../../../auth/interfaces/existing-user.interface';


export interface UserDataState {
  mainResponse: IUser | null,
}

export const initialAuthState: UserDataState = {
  mainResponse: null,
};

export function userDataReducer(state: UserDataState | undefined, action: Action): UserDataState {
  return reducer(state, action);
}

  const reducer = createReducer<UserDataState>(
  initialAuthState,

    on(mainActions.getUsersData, state => ({ ...state, })
    ),

    on(mainActions.getUsersDataSuccess, (state, { mainResponse }) => ({ ...state, mainResponse, })
    ),

    on(mainActions.getUsersDataFailure, state => ({ ...state, })
    ),
  )
