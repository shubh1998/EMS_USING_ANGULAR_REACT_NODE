import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CookieService } from "ngx-cookie-service";
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';

@NgModule({
  declarations: [
    ContentLayoutComponent,
    FullLayoutComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      maxOpened: 1,
      autoDismiss: true
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    CookieService
  ],
})
export class CoreModule { }
