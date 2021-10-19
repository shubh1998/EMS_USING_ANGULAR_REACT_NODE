import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(
    private _cookieService : CookieService
  ) { }

  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = this._cookieService.get("token");

    if (token) {
      request = request.clone({
        setHeaders: { 'Access-Control-Allow-Origin': '*', Authorization: 'Bearer ' + token }
      });
    } else {
      request = request.clone({
        setHeaders: { 'Access-Control-Allow-Origin': '*' }
      });
    }
    return next.handle(request);
  }
}
