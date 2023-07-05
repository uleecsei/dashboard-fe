import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthState } from '../../store/auth.reducer';
import { signIn, googleAuth } from '../../store/auth.actions';
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { KeyEnum } from 'src/app/shared/enums/keys.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends Unsubscriber {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  hide = true;
  actualUserEmail!: string;
  actualUserGoogleId!: string;

  constructor(
    private store: Store<AuthState>,
    private localStorage: LocalStorageService
  ) {
    super();
  }

  loginWithGoogle(): void {
    this.store.dispatch(googleAuth());
    this.actualUserEmail = this.localStorage.getItem(KeyEnum.googleAuthKey).email;
    this.actualUserGoogleId = this.localStorage.getItem(KeyEnum.googleAuthKey).id;
    this.store.dispatch(signIn({ email: this.actualUserEmail, googleId: this.actualUserGoogleId, password: '' }));
  }

  loginWithForm(): void {
    this.store.dispatch(signIn({ email: this.form.value.email.trim(), password: this.form.value.password.trim() }));
  }

}
