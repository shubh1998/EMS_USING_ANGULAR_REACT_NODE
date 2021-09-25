import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { validateAllFormFields } from 'src/app/core/custom-validators/custom-validators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<boolean>();

  registerForm: FormGroup = new FormGroup({
      company_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
  });

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _utility: UtilityService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.registerForm.valid){
      this._auth.registerService(this.registerForm.value).pipe(takeUntil(this._unsubscribe)).subscribe(
        (response: any) => {
          this._utility.toastSuccess("Registered", "Company registered successfully !")
          this._router.navigateByUrl('/auth/login')
        },
        (error: any) => {
          this._utility.routingAccordingToError(error);
        }
      )
    }else{
      validateAllFormFields(this.registerForm)
    }
  }

  ngOnDestroy (){
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
