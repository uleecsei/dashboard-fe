import { createSelector } from '@ngrx/store';

import { AuthState } from './auth.reducer';

export const selectAuthState = (state: AuthState) => state;

export const selectAuthResponse = createSelector(
  selectAuthState,
  state => state.authResponse
)
