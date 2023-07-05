import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

import * as mainActions from './user-data.actions'
import { NotificationService } from '../../../core/services/notification.service';
import { UserDataService } from 'src/app/main/services/user-data.service';
import { IUser } from '../../../auth/interfaces/existing-user.interface';


@Injectable({
  providedIn: 'root',
})
export class UserDataEffects {

  constructor(
    private actions$: Actions,
    private userDataService: UserDataService,
    private notify: NotificationService,
  ) { }

  mainResponse$ = createEffect(() => this.actions$.pipe(
    ofType(mainActions.getUsersData),
    switchMap(() => this.userDataService.userData()
      .pipe(
        map((mainResponse: IUser) => {
          return mainActions.getUsersDataSuccess({ mainResponse })
        }),
        catchError((err) => {
          this.notify.showFailure(err)
          return of(mainActions.getUsersDataFailure())
        })
      ))
  ));

}
