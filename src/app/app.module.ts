import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { AuthEffects } from './auth/store/auth.effects';
import { CoreEffects } from './core/store/core.effects';
import { coreReducer } from './core/store/core.reducer';
import { authReducer } from './auth/store/auth.reducer';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UserManagerEffects } from './main/profile/store/profile.effects';
import { userManagerReducer } from './main/profile/store/profile.reducer';
import { UserDataEffects } from './shared/store/users-data/user-data.effects';
import { userDataReducer } from './shared/store/users-data/user-data.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    AuthModule,
    CoreModule,
    EffectsModule.forRoot([CoreEffects, AuthEffects, UserDataEffects, UserManagerEffects]),
    StoreModule.forRoot({
      coreStore: coreReducer,
      auth: authReducer,
      userDataStore: userDataReducer,
      userManager: userManagerReducer
    }, ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
