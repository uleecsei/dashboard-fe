import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";
import { ProfileComponent } from "./profile.component";


@NgModule({
  declarations: [
    ProfileComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ],
  bootstrap: []
})
export class ProfileModule { }
