import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuItems: any[] = [
    {
      name: "Home",
      path: '/',
    },
    {
      name: "About Us",
      path: '/about-us',
    },
    {
      name: "Contact Us",
      path: '/contact-us',
    },
    {
      name: "Login",
      path: '/auth/login',
    },
    {
      name: "Register",
      path: '/auth/register',
    },
  ]
  tokenExist: boolean = false
  @Input() isLoggedIn = false

  constructor(
    private _cookieService : CookieService,
    private _auth: AuthService
  ) {
    if (this._cookieService.get("token")) {
      this.tokenExist = true;
      this.menuItems = [
        {
          name: "Home",
          path: '/',
        },
        {
          name: "Employee",
          path: '/employee-list',
        },
        {
          name: "About Us",
          path: '/about-us',
        },
        {
          name: "Contact Us",
          path: '/contact-us',
        },
      ]
    }
   }

  ngOnInit(): void {
  }

  logoutClicked() {
    try{
      this._auth.logOutService()
    }catch(error){
      throw error;
    }
  }

}
