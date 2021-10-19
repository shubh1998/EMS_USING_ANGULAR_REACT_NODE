import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private _auth: AuthService
  ) { }

  canActivate() {
    if (this._auth.isAuthenticated()) {
      return true
    }
    this._auth.logOutService()
    return false
  }
}
