import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { TableComponent } from './components/table/table.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TableComponent,
    SideBarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    MaterialModule,
    TableComponent,
    HeaderComponent,
    SideBarComponent
  ]
})
export class SharedModule { }
