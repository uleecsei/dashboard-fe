import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

import { KeyEnum } from '../../shared/enums/keys.enum';
import { INewUser } from '../interfaces/creater-user.interface';
import { IUser } from '../interfaces/existing-user.interface';
import { IGoogleAuthResponse } from '../interfaces/google-auth-response.interface';
import { environment } from '../../../environments/environment';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService {

  constructor
  (
    private http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService,
  )
   {
  }

  login(email: string, password?: string, googleId?:string ): Observable<IUser> {
    return this.http.post<IUser>(environment.apiUrl + 'users/login', { email, password, googleId })
    .pipe(map(user => {
        return user;
    }));
  }

  googleLogin(): Observable<IGoogleAuthResponse> {
    return this.socialAuthService.authState
      .pipe(
        map((authResponse: IGoogleAuthResponse) => {
          this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
            return authResponse
        }),
      )
  }

  signUp(email:string, name: string, isAdmin: boolean, password?:string, googleId?: string, ): Observable<INewUser> {
    return this.http.post<INewUser>(environment.apiUrl + 'users/registration', { email, password, name, googleId, isAdmin });
  }

  logout(): Observable<any> {
    return new Observable(subscriber => {
      localStorage.removeItem(KeyEnum.userKey);
      localStorage.removeItem(KeyEnum.tokenKey);
      localStorage.removeItem(KeyEnum.googleAuthKey);
      this.router.navigate(['/login']);
    });
}
}
