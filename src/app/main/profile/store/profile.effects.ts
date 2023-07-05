import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

import * as profileActions from './profile.actions'
import { NotificationService } from '../../../core/services/notification.service';
import { ProfileService } from '../../services/profile.service';


@Injectable({
  providedIn: 'root',
})
export class UserManagerEffects {

  constructor(
    private actions$: Actions,
    private notify: NotificationService,
    private profile: ProfileService,
  ) {
  }

  loadProfileData = createEffect(() => this.actions$.pipe(
    ofType(profileActions.loadProfileData),
    switchMap((action) => this.profile.getUser(action.id)
      .pipe(
        map((userManagerResponse) => {
          return profileActions.loadProfileDataSuccess({ userManagerResponse });
        }),
        catchError((err) => {
          this.notify.showFailure(err)
          return of(profileActions.loadProfileDataFailure())
        })
      ))
  ));

  setProfileData$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.setProfileData),
    switchMap(({ field }) => this.profile.setProfileData(field)
      .pipe(
        map((profile: any) => {
          return profileActions.setProfileDataSuccess({ profile });
        }),
        catchError((err) => {
          this.notify.showFailure(err)
          return of(profileActions.setProfileDataFailure())
        })
      ))
  ));

  uploadUserPic$ = createEffect(() => this.actions$.pipe(
    ofType(profileActions.userManagerPicture),
    switchMap((action) => this.profile.updatePhoto(action.data)
      .pipe(
        map((profileAvatar) => {
          return profileActions.userManagerPictureSuccess({ profileAvatar })
        }),
        catchError((err) => {
          this.notify.showFailure(err)
          return of(profileActions.userManagerPictureFailure())
        })
      ))
  ));

}
