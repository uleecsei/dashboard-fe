import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { IUser } from '../../auth/interfaces/existing-user.interface';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserDataService {

  constructor(
    private http: HttpClient,
  ) {  }

  userData(): Observable<IUser> {
    return this.http.get<IUser>(environment.apiUrl + 'users')
  };
}
