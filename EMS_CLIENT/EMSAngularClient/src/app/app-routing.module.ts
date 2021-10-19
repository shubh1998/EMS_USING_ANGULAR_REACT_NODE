import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { ContentLayoutComponent } from './core/layouts/content-layout/content-layout.component';
import { FullLayoutComponent } from './core/layouts/full-layout/full-layout.component';
import { CONTENT_ROUTES } from './core/routes/content-layout.routes';
import { Full_ROUTES } from './core/routes/full-layout.routes';

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "pages",
  //   pathMatch: "full"
  // },

  {
    path: "",
    component: ContentLayoutComponent,
    data: { title: "content Views" },
    children: CONTENT_ROUTES
  },
  {
    path: "",
    component: FullLayoutComponent,
    children: Full_ROUTES,
    canActivate: [AuthGuardService]
  },
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
