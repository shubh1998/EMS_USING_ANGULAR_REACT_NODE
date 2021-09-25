import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private errorHandler: ErrorHandlerService,
    private toast: ToastrService,
  ) { }

  routingAccordingToError(error: any) {
    this.errorHandler.routeAccordingToError(error);
  }

  toastSuccess(title: string, details: string) {
    this.toast.success(details, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 4000
    });
  }

  toastInfo(title: string, details: string) {
    this.toast.info(details, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 4000
    });
  }

  toastWarning(title: string, details: string) {
    this.toast.warning(details, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 4000
    });
  }

  toastError(title: string, details: string) {
    this.toast.error(details, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 4000
    });
  }
}
