import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/services/auth.service';
import { onMainContentChange } from '../shared/components/utils/animations/animations';
import { SidenavService } from '../shared/services/sidenav.service';
import { Unsubscriber } from '../shared/unsubscriber.class';
import { LocalStorageService } from '../core/services/local-storage.service';
import { KeyEnum } from '../shared/enums/keys.enum';
import { AuthState } from '../auth/store/auth.reducer';
import { logOut } from '../auth/store/auth.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [onMainContentChange],
})
export class MainComponent extends Unsubscriber {
  onSideNavChange = true;
  user: any;

  constructor(
    private router: Router,
    private _sidenavService: SidenavService,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private store: Store<AuthState>,
  ) {
    super();
      if(!this.localStorage.getItem(KeyEnum.userKey)){
        this.store.dispatch(logOut())
      }

    this.user = this.localStorage.getItem(KeyEnum.userKey);

    this._sidenavService.sideNavState$.pipe(
      takeUntil(this.unsubscribe)
      ).subscribe((res) => {
        this.onSideNavChange = res;
      });
  }

  logout(): void {
    this.store.dispatch(logOut());
  }

  isAdmin(): boolean {
    if (this.user) {
      return this.user!.isAdmin;
    }
    return false;
  }

  toAdminPage(): void {
    this.router.navigate(['admin']);
  }
}
