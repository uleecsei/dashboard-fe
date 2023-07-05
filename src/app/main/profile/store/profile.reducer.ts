import { Action, createReducer, on } from '@ngrx/store';

import * as userManagerActions from './profile.actions'
import { IUserEntity } from '../../../shared/interfaces/user-entity.interface';
import { IUploadFileResponse } from '../../../shared/interfaces/upload-file-interface';

export interface  UserManagerState {
  userManagerResponse: IUserEntity | null,
  profileAvatar: IUploadFileResponse | null
}

export const initialUserManagerState: UserManagerState = {
  userManagerResponse: null,
  profileAvatar: null
};

export function userManagerReducer(state: UserManagerState | undefined, action: Action): UserManagerState {
  return reducer(state, action);
}

  const reducer = createReducer<UserManagerState>(
    initialUserManagerState,

    on(userManagerActions.userManagerPicture, state => ({ ...state, })
    ),


    on(userManagerActions.userManagerPictureFailure, state => ({ ...state, })
    ),

    on(userManagerActions.loadProfileDataSuccess, (state, { userManagerResponse }) => ({
        ...state,
      userManagerResponse,
      })
    ),

    on(userManagerActions.userManagerPictureSuccess, (state, { profileAvatar }) => ({
        ...state,
      profileAvatar,
      })
    ),

  )
