import { createAction, props } from '@ngrx/store';

import { IUserEntity } from '../../../shared/interfaces/user-entity.interface';

export const loadProfileData = createAction('[Profile page] Load Profile Data', props<{ id: string }>());
export const loadProfileDataSuccess = createAction('[Profile page] Load Profile Data Success', props< { userManagerResponse: IUserEntity } >());
export const loadProfileDataFailure = createAction('[Profile page] Load Profile Data Failure');

export const setProfileData = createAction('[Profile page] Set Profile Data', props<{ field: any }>());
export const setProfileDataSuccess = createAction('[Profile page] Set Profile Data Success', props<{  profile: any }>());
export const setProfileDataFailure = createAction('[Profile page] Set Profile Data Failure');

export const userManagerPicture = createAction('[userManagerPicture] userManagerPicture', props<{ data: FormData }>());
export const userManagerPictureSuccess = createAction('[userManagerPicture] userManagerPicture Success', props< { profileAvatar: any } >());
export const userManagerPictureFailure = createAction('[userManagerPicture] userManagerPicture Failure');
