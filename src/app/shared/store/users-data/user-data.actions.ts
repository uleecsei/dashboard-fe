import { createAction, props } from '@ngrx/store';

import { IUser } from '../../../auth/interfaces/existing-user.interface';

export const getUsersData = createAction('[User data page] User data');
export const getUsersDataSuccess = createAction('[User data page] User data Success', props< { mainResponse: IUser } >());
export const getUsersDataFailure = createAction('[User data page] User data Failure');
