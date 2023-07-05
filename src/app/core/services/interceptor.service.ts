import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { KeyEnum } from 'src/app/shared/enums/keys.enum';

@Injectable()
export class coreInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.localStorage.getItem(KeyEnum.userKey) &&
      !this.localStorage.getItem(KeyEnum.userKey).authToken
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.localStorage.getItem(KeyEnum.tokenKey)}`,
        },
      });
    } else if (this.localStorage.getItem(KeyEnum.userKey)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.localStorage.getItem(KeyEnum.userKey).authToken}`,
        },
      });
    }
    return next.handle(request);
  }
}
