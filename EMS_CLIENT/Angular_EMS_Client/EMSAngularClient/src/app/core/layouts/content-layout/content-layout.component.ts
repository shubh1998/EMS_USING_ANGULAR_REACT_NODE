import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent implements OnInit {
  loggedinState: boolean = false

  constructor(
    private _cookieService: CookieService
  ) {
    if(this._cookieService.get('token')){
      this.loggedinState = true
    }
   }

  ngOnInit(): void {
  }

}
