import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { validateAllFormFields } from 'src/app/core/custom-validators/custom-validators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<boolean>();

  loginForm: FormGroup = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
  });

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _utility: UtilityService,
    private _cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm.valid){
      this._auth.loginService(this.loginForm.value).pipe(takeUntil(this._unsubscribe)).subscribe(
        (response: any) => {
          let AuthToken = response.headers.get("AuthToken")
          if(AuthToken){
            //-------Set Cookie Expiration Time (1 Day)-------------
            // 0.25 for 6 hours
            this._cookieService.set("token", AuthToken, 1.0, "/");
          }
          this._router.navigateByUrl('/employee-list')
          this._utility.toastSuccess("Logged in", "Logged in successfully !")
        },
        (error: any) => {
          this._utility.routingAccordingToError(error);
        }
      )
    }else{
      validateAllFormFields(this.loginForm)
    }
  }

  ngOnDestroy (){
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
