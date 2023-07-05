import { Component } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { Unsubscriber } from '../../shared/unsubscriber.class';
import { ISignUpResponse } from '../../core/interfaces/signup-response.interface';
import { getUsersData } from 'src/app/shared/store/users-data/user-data.actions';
import { UserDataState } from 'src/app/shared/store/users-data/user-data.reducer';
import { selectUserDataResponse } from 'src/app/shared/store/users-data/user-data.selectors';
import { KeyEnum } from '../../shared/enums/keys.enum';
import { logOut } from '../../auth/store/auth.actions';
import { AuthState } from '../../auth/store/auth.reducer';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent extends Unsubscriber {

  mainStore$: Observable<any> = this.store.select(selectUserDataResponse);
  tableData!: ISignUpResponse[]

  constructor(
    private store: Store<UserDataState>,
    private authStore: Store<AuthState>,
    private localStorage: LocalStorageService
  ) {
    super();
    if(!this.localStorage.getItem(KeyEnum.userKey)){
      this.authStore.dispatch(logOut())
    }

    this.store.dispatch(getUsersData());

    this.mainStore$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(data => {
      this.tableData = data
    })
  }
}


