import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, takeUntil } from 'rxjs';

import { LocalStorageService } from '../../core/services/local-storage.service';
import { UserManagerState } from './store/profile.reducer';
import * as profileActions from './store/profile.actions'
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';
import { KeyEnum } from '../../shared/enums/keys.enum';
import { selectProfile, selectUploadFileData } from './store/profile.selectors';
import { IUploadFileResponse } from '../../shared/interfaces/upload-file-interface';
import { ProfileService } from '../services/profile.service';
import { AuthState } from '../../auth/store/auth.reducer';
import { logOut } from '../../auth/store/auth.actions';


@Component({
  selector: 'app-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent extends Unsubscriber implements OnInit {

  isUserChanging = false;
  actualName!: string;
  file!: File;
  imageSrc!: string;
  formFields!: string[];
  actualChanging: any;
  formGroup = new FormGroup({});
  editableFields = ['email', 'name', 'password', 'age'];
  isFileUploaded = false;
  actualUserId!: string;

  @ViewChild('inputFile') inputRef?: ElementRef

  constructor(
    private localStorage: LocalStorageService,
    private store: Store<UserManagerState>,
    private profileService: ProfileService,
    private authStore: Store<AuthState>,
  ) {
    super();
    if(!this.localStorage.getItem(KeyEnum.userKey)){
      this.authStore.dispatch(logOut())
    }
  }

  ngOnInit(): void {
      this.actualUserId = this.localStorage.getItem(KeyEnum.userKey).id;
      this.store.dispatch(profileActions.loadProfileData({ id: this.actualUserId }));
      this.store.select(selectProfile).pipe(
        delay(100),
        takeUntil(this.unsubscribe)
      ).subscribe((profileResponse) => {
        if (profileResponse) {
          this.createFormControls(profileResponse);
          this.imageSrc = profileResponse.avatarUrl;
          this.formFields = Object.keys(this.formGroup.controls)
        }
      });
  }

  createFormControls(profileResponse: any): void {
    Object.keys(profileResponse)
      .filter(entry => this.editableFields.includes(entry))
      .map(entry => {
          this.formGroup.addControl(entry, new FormControl({
            value: profileResponse[entry],
            disabled: true
          }));
      })
  }

  isUserStartEdit(unit: string): boolean {
    return this.isUserChanging && this.formGroup.controls[`${unit}`] === this.actualChanging;
  }

  startEditData(unit: string): void {
    /** DISABLE PREVIOUS FIELD*/
    if (this.actualChanging && this.actualChanging !== this.formGroup.controls[`${unit}`]) {
      this.actualChanging.disable()
    }
    this.isUserChanging = true;
    this.actualChanging = this.formGroup.controls[`${unit}`];
    this.formGroup.controls[`${unit}`].disabled ? this.formGroup.controls[`${unit}`].enable() : this.formGroup.controls[`${unit}`].disable();
  }

  cancelEditData(unit: string): void {
    this.isUserChanging = false;
    this.formGroup.controls[`${unit}`].disabled ? this.formGroup.controls[`${unit}`].enable() : this.formGroup.controls[`${unit}`].disable()
  }

  sendData(unit: string): void {
    this.store.dispatch(profileActions.setProfileData({ field: this.formGroup.value }));
    console.log({ field: this.formGroup.value })
    this.formGroup.controls[`${unit}`].disabled ? this.formGroup.controls[`${unit}`].enable() : this.formGroup.controls[`${unit}`].disable();
    this.isUserChanging = false;
  }

  setFileName(): void {
    this.isFileUploaded = false;
    if (this.inputRef?.nativeElement.files[0]) {
      this.file = this.inputRef.nativeElement.files[0];
    }
  }

  uploadPicture(): void {
    if (this.inputRef?.nativeElement.files[0]) {
      this.file = this.inputRef.nativeElement.files[0];

      this.store.dispatch(profileActions.userManagerPicture({ data: this.profileService.createFormData(this.file) }));

      this.store.select(selectUploadFileData).pipe(
        delay(100),
        takeUntil(this.unsubscribe)
      ).subscribe((uploadDataResponse: IUploadFileResponse) => {
        if(uploadDataResponse){
          this.imageSrc = uploadDataResponse.secure_url;
          this.isFileUploaded = true;
          this.store.dispatch(profileActions.setProfileData({ field: { avatarUrl: uploadDataResponse.secure_url } }));
        }
      });
    }

  }

}
