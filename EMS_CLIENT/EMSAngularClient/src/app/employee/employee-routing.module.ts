import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee-list',
    pathMatch: 'full'
  },

  {
    path: 'employee-list',
    component: EmployeeListComponent
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent
  },
  {
    path: 'view-employee/:id',
    component: ViewEmployeeComponent
  },
  {
    path: 'edit-employee/:id',
    component: AddEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
