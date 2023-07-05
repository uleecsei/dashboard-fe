import { createAction, props } from '@ngrx/store';

import { INewUser } from '../interfaces/creater-user.interface';
import { IGoogleAuthResponse } from '../interfaces/google-auth-response.interface';
import { IUser } from '../interfaces/existing-user.interface';



export const googleAuth = createAction('[Auth page] Google Auth');
export const googleAuthSuccess = createAction('[Auth page] Google Auth Success', props<{ authResponse: IGoogleAuthResponse }>());
export const googleAuthFailure = createAction('[Auth page] Google Auth Failure');

export const googleSignUp = createAction('[Auth page] Google SignUp Auth');
export const googleSignUpSuccess = createAction('[Auth page] Google SignUp Auth Success', props<{ authResponse: IGoogleAuthResponse }>());
export const googleSignUpFailure = createAction('[Auth page] Google SignUp Auth Failure');

export const signIn = createAction('[Auth] Sign In', props<{ email: string; password?: string; googleId?: string }>());
export const signInSuccess = createAction('[Auth] Sign In Success', props<{ authResponse: IUser }>());
export const signInFailure = createAction('[Auth] Sign In Failure');

export const signUp = createAction('[Sign Up page] Sign Up', props<{ email: string; password?: string; name: string; googleId?: string, isAdmin: boolean }>());
export const signUpSuccess = createAction('[Sign Up page] Sign Up Success', props<{ signUpResponse: INewUser }>());
export const signUpFailure = createAction('[Sign Up page] Sign Up Failure');

export const logOut = createAction('[logOut] logOut');
export const logOutSuccess = createAction('[logOut] logOut Success');
export const logOutFailure = createAction('[logOut] logOut Failure');






