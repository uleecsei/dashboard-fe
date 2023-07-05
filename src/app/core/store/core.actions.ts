import { createAction } from '@ngrx/store';

export const coreStore = createAction('[Core store] Core store');
export const coreStoreSuccess = createAction('[Core store] Core store Success');
export const coreStoreFailure = createAction('[Core store] Core store Failure');
