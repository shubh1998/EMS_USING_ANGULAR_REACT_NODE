import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = environment.baseUrl

  constructor(
    private _http: HttpClient,
    private _cookieService: CookieService,
    private _router: Router
  ) { }

  loginService(data: any) {
    return this._http.post(this.baseURL + "/company/login", data, { observe: "response" })
      .pipe( timeout(10000), catchError(error => {
          return throwError(error);
        })
      );
  }

  registerService(data: any) {
    return this._http.post(this.baseURL + "/company/register", data, { observe: "response" })
      .pipe( timeout(10000), catchError(error => {
          return throwError(error);
        })
      );
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    //console.log("isAuthenticated", this._cookieService.get("token"));
    if(this._cookieService.get("token")){ return true; }
    else {return false};
  }

  // for user logout
  logOutService() {
    this._cookieService.delete('token', '/');
    localStorage.clear();
    this._router.navigate(["/"]);
  }
}
