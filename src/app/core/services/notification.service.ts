import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(): void {
    this.toastr.success('Success', 'Welcome Home');
  }

  showFailure(message:string): void {
    this.toastr.error(message, 'Error!#@!1?');
  }
}
