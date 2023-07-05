import { Component } from '@angular/core';
import { KeyEnum } from '../../shared/enums/keys.enum';
import { logOut } from '../../auth/store/auth.actions';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/store/auth.reducer';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  constructor (
    private localStorage: LocalStorageService,
    private authStore: Store<AuthState>
  ) {
    if(!this.localStorage.getItem(KeyEnum.userKey)){
      this.authStore.dispatch(logOut())
    }
  }
}


