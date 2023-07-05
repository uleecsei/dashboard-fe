import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../../core/services/local-storage.service';
import { environment } from '../../../environments/environment';
import { IUserEntity } from '../../shared/interfaces/user-entity.interface';
import { KeyEnum } from '../../shared/enums/keys.enum';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProfileService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) {
  }

  setProfileData(field: any): Observable<any> {
    const user = this.localStorage.getItem(KeyEnum.userKey)
    return this.http.patch(environment.apiUrl + 'users/' + user.id, field)
  }


  getUser(id: string): Observable<IUserEntity> {
    return this.http.get<IUserEntity>(environment.apiUrl + 'users/' + id)
  }

  createFormData(file: File): FormData {
    const data = new FormData();
    data.append('file', file);
    return data
  }

  updatePhoto(data: FormData) {
    return this.http.post(
      environment.apiUrl + 'upload-file/' + this.localStorage.getItem(KeyEnum.userKey).id,
      data,
      { headers: { Authorization: `Bearer ${this.localStorage.getItem(KeyEnum.tokenKey)}` } })
  }

}


