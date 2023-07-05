import { createSelector } from '@ngrx/store';

export const selectMainState = (state: any) => state.userManager;

export const selectProfile = createSelector(
  selectMainState,
  state => state.userManagerResponse
)

export const selectUploadFileData = createSelector(
  selectMainState,
  state => state.profileAvatar
)
