import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

import * as authActions from './auth.actions'
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { KeyEnum } from 'src/app/shared/enums/keys.enum';


@Injectable({
  providedIn: 'root',
})

export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService,
    private localStorage: LocalStorageService
  ) { }

  googleSignUp$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.googleSignUp),
    switchMap(() => this.authService.googleLogin()
      .pipe(
        map((authResponse) => {
          this.localStorage.setItem(KeyEnum.googleAuthKey, authResponse);
          this.router.navigate(['login']);
          return authActions.googleSignUpSuccess({ authResponse })
        }),

        catchError((err) => {
          this.notify.showFailure(err)
          return of(authActions.googleAuthFailure())
        })
      ))
  ));

  googleLogIn$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.googleAuth),
    switchMap(() => this.authService.googleLogin()
      .pipe(
        map((authResponse) => {
          this.localStorage.setItem(KeyEnum.googleAuthKey, authResponse);
          return authActions.googleAuthSuccess({ authResponse })
        }),

        catchError((err) => {
          this.notify.showFailure(err)
          return of(authActions.googleAuthFailure())
        })
      ))
  ));

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signIn),
    switchMap((action) => this.authService.login(action.email, action?.password, action?.googleId)
      .pipe(
        map((authResponse) => {
          this.router.navigate(['main']);
          this.notify.showSuccess();
          this.localStorage.setItem(KeyEnum.userKey, authResponse);
          this.localStorage.setItem(KeyEnum.tokenKey, authResponse.token)
          return authActions.signInSuccess({ authResponse })
        }),

        catchError((err) => {
          this.notify.showFailure(err.error.msg)
          return of(authActions.signInFailure())
        })
      ))
  ));

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signUp),
    switchMap((action) => this.authService.signUp(action.email, action.name, action.isAdmin, action?.password, action?.googleId  )
      .pipe(
        map((signUpResponse) => {
          this.notify.showSuccess();
          this.router.navigate(['main']);
          return authActions.signUpSuccess({ signUpResponse })
        }),

        catchError((err) => {
          this.notify.showFailure(err.error.msg)
          return of(authActions.signUpFailure())
        })
      ))
  ));


  logOut$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logOut),
    switchMap(() => this.authService.logout()
      .pipe(
        map(() => {
          return authActions.logOutSuccess()
        }),

        catchError((err) => {
          this.notify.showFailure(err.error.msg)
          return of(authActions.logOutFailure())
        })
      ))
  ));

}
