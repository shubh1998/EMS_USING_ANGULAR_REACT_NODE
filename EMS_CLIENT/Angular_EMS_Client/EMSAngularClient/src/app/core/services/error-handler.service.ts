import {Injectable} from '@angular/core';
import {TimeoutError} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private router: Router, private toastr: ToastrService, 
    private _cookieService: CookieService
  ) {
  }

  routeAccordingToError(error: any) {
    if (error.status === 500) {
      this.errorToast('Oops!', error.message);
      this.redirectToLogin();
    }
    else if (error instanceof TimeoutError) {
      this.errorToast('Oops!', error.message);
    } else if (error.status === 0) {
      this.errorToast(
        'Oops!',
        'Please check your internet connection or try again later'
      );
    } else {
      this.errorToast('Oops!', error.error.message || error.error);
      if ((error.status === 401 || error.error === 'Unauthorized')) {   
          this.redirectToLogin();
      }
      else if (error.status === 410) {
        this.router.navigateByUrl('/');
      } 
      else if (error.error.message === 'page under construction') {
        this.router.navigate(['/page-under-construction']);
      }
    }
  }

  redirectToLogin() {
    this._cookieService.delete('token', '/admin');
    this.router.navigateByUrl('/auth/login');
  }

  errorToast(title: string, detail: string) {
    this.toastr.error(detail, title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 4000
    });
  }
}
