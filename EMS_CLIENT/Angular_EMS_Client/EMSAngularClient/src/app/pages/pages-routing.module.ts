import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  //  {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'about-us',
    component: AboutComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
