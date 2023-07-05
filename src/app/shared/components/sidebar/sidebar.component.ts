import { Component, OnInit } from '@angular/core';
import { delay, takeUntil} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Store } from '@ngrx/store';

import { Unsubscriber } from 'src/app/shared/unsubscriber.class';
import { IPage } from '../../interfaces/page.interface';
import { SidenavService } from '../../services/sidenav.service';
import { onSideNavChange, animateText } from '../utils/animations/animations';
import { logOut } from '../../../auth/store/auth.actions';
import { AuthState } from '../../../auth/store/auth.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [onSideNavChange, animateText],
})
export class SideBarComponent extends Unsubscriber implements OnInit {
  sideNavState = true;
  linkText = true ;
  onSideNavChange = true;

  pages: IPage[] = [
    { name: 'Dashboard', link: '/main/test', icon: 'dashboard' },
    { name: 'user', link: '/main/profile', icon: 'person_pin' },
  ];

  constructor(
    private _sidenavService: SidenavService,
    private authService: AuthService,
    private store: Store<AuthState>
  )
  {
    super();
  }

  ngOnInit() {
    this._sidenavService.sideNavState$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe( res => {
      this.onSideNavChange = res
    });

    this._sidenavService.sideNavState$.pipe(
      takeUntil(this.unsubscribe),
      delay(200)
    ).subscribe( () => {
      this.linkText = this.onSideNavChange
    });
  }

  logout(): void {
    this.store.dispatch(logOut())
  }

}
