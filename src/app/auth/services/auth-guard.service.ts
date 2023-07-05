import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { KeyEnum } from 'src/app/shared/enums/keys.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  actualUser: any;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
  ) {
    this.actualUser = this.localStorage.getItem(KeyEnum.userKey);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.actualUser) {
      if (route.data['isAdmin'] && !this.actualUser.isAdmin) {
        this.router.navigate(['main']);
        return false;
      }
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
