import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreComponent } from './core.component';
import { coreInterceptor } from './services/interceptor.service';

@NgModule({
  declarations: [
    CoreComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: coreInterceptor,
    multi: true
  }],
  bootstrap: []
})
export class CoreModule { }
