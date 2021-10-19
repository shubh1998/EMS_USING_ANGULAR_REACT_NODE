import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {
  loggedinState: boolean = false
 
  constructor(
    private _cookieService: CookieService
  ) {
    if(this._cookieService.get('token')){
      this.loggedinState = true
    }
  }
  
  ngOnInit() {
  }
}
