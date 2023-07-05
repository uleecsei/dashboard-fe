import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

import { AuthGuardService } from '../auth/services/auth-guard.service';
import { environment } from '../../environments/environment';
import { MainRoutingModule } from './main-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SharedModule } from '../shared/shared.module';
import { SidenavService } from '../shared/services/sidenav.service';
import { TestComponent } from './test/test.component';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    MainComponent,
    AdminPageComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    SocialLoginModule,
    MainRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(environment.apiGoogleKey)
        }
      ]
    }
  },
    AuthGuardService,
    SidenavService,
  ]
})
export class MainModule {
}
