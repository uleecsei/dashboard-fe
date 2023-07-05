import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as authActions from '../../store/auth.actions'
import { AuthState } from '../../store/auth.reducer';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { KeyEnum } from 'src/app/shared/enums/keys.enum';

@Component({
  selector: 'app-login',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  hide = true;
  isOurTeamMate = true;
  googleResponseKey = 'googleResponse';

  constructor
  (
    private store: Store<AuthState>,
    private localStorage: LocalStorageService,
  ) { }

  onSubmit(): void {
    this.store.dispatch(authActions.signUp(this.form.value));
  }

  signUpWithGoogle(): void {
    this.store.dispatch(authActions.googleAuth());
    this.store.dispatch(authActions.signUp({ email: this.localStorage.getItem(KeyEnum.googleAuthKey).email, password: '', googleId: this.localStorage.getItem(KeyEnum.googleAuthKey).id, isAdmin: true, name: this.localStorage.getItem(KeyEnum.googleAuthKey).name}))
  }

}
