import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../auth/services/auth-guard.service';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'test', component: TestComponent},
      { path: 'profile', component: ProfileComponent},
    ]
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuardService],
    data: { isAdmin: true }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
