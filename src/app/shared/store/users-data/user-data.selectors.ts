import { createSelector } from '@ngrx/store';

export const selectUserDataState = (state: any) => state;

export const selectUserDataResponse = createSelector(
  selectUserDataState,
  state => state.userDataStore.mainResponse
)
