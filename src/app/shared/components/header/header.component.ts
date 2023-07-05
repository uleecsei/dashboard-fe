import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { KeyEnum } from '../../enums/keys.enum';
import { SidenavService } from '../../services/sidenav.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class HeaderComponent {
  sideNavState = true;
  user: any;

  constructor(
    private _sidenavService: SidenavService,
    private authService: AuthService,
    private localStorage: LocalStorageService,
  ) {
    this.user = this.localStorage.getItem(KeyEnum.userKey);
  }

  onSidenavToggle(): void {
    this.sideNavState = !this.sideNavState;
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }
}
