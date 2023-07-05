import { Action, ActionReducer, createReducer, MetaReducer, on, State } from '@ngrx/store';

import * as authActions from './auth.actions';
import { INewUser } from '../interfaces/creater-user.interface';
import { IGoogleAuthResponse } from '../interfaces/google-auth-response.interface';
import { IUser } from '../interfaces/existing-user.interface';
import { storeReset } from 'ngrx-store-reset';


export interface AuthState {
  authResponse: IGoogleAuthResponse | IUser | null,
  signUpResponse: INewUser | null
}

export const initialAuthState: AuthState = {
  authResponse: null,
  signUpResponse: null
};

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}

  const reducer = createReducer<AuthState>(
  initialAuthState,

  /**ON GOOGLE AUTH */
    on(authActions.googleAuth, state => ({ ...state, })
    ),

    on(authActions.googleAuthSuccess, (state, { authResponse }) => ({ ...state, authResponse, })
    ),

    on(authActions.googleAuthFailure, state => ({ ...state, })
    ),

    /**ON GOOGLE SIGN UP */
    on(authActions.googleSignUp, state => ({ ...state, })
    ),

    on(authActions.googleSignUpSuccess, (state, { authResponse }) => ({ ...state, authResponse, })
    ),

    on(authActions.googleSignUpFailure, state => ({ ...state, })
    ),

    /**ON FORM AUTH */
    on(authActions.signIn, state => ({ ...state, })
    ),

    on(authActions.signInSuccess, (state, { authResponse }) => ({ ...state, authResponse, })
    ),

    on(authActions.signInFailure, state => ({ ...state, })
    ),

        /**ON SIGN UP */

    on(authActions.signUp, state => ({ ...state, })
    ),

    on(authActions.signUpSuccess, (state, { signUpResponse }) => ({ ...state, signUpResponse, })
    ),

    on(authActions.signUpFailure, state => ({ ...state, })
    ),

  )
//
// export function storeResetMetaReducer(reducer: ActionReducer<State<any>>): ActionReducer<State<any>> {
//   return storeReset({ action: authActions.logOut.type })(reducer);
// }
//
// export const metaReducers: MetaReducer<State<any>>[] = [ storeResetMetaReducer ];

