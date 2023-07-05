import { Action, createReducer, on } from '@ngrx/store';

import * as coreStoreActions from './core.actions';

export interface CoreStoreState {
  coreStore:  null
}

export const initialCoreState: CoreStoreState = {
  coreStore: null
};

export function coreReducer(state: CoreStoreState | undefined, action: Action): CoreStoreState {
  return reducer(state, action);
}

  const reducer = createReducer<CoreStoreState>(
    initialCoreState,

  /**CORE STORE */
    on(coreStoreActions.coreStore, state => ({ ...state, })
    ),

    on(coreStoreActions.coreStoreSuccess, state => ({ ...state })
    ),

    on(coreStoreActions.coreStoreFailure, state => ({ ...state, })
    ),

  )

