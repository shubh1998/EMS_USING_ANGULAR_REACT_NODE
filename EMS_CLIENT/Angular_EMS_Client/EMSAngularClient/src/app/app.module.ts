import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxUiLoaderModule, NgxUiLoaderConfig, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: "ball-spin-clockwise"
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
      exclude: [
        `${baseUrl}/adminNotification`,
        `${baseUrl}/subAdminNotification`
      ]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
