import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { takeUntil } from 'rxjs/operators';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: any[] = []
  private _unsubscribe = new Subject<boolean>();
  departments: any[] = []

  constructor(
    private _employeeService: EmployeeService,
    private _utility: UtilityService
  ) { }

  ngOnInit(): void {
    this.fetchDepartments()
    this.fetchAllEmployees('')
  }

  fetchAllEmployees(department: string) {
    try{
      this._employeeService.getEmployeeList(department).pipe(takeUntil(this._unsubscribe))
        .subscribe((response: any) => {
          this.employees = response.data
        },
        (error: any) => {
          this._utility.routingAccordingToError(error);
        }
      )
    }catch(err){
      throw err
    }
  }

  deleteEmployee(id: any){
    try{
      this._employeeService.deleteEmployee(id).pipe(takeUntil(this._unsubscribe))
        .subscribe((response: any)=>{
            this._utility.toastSuccess("Employee", "Deleted Successfully !")
            this.fetchAllEmployees('');
          },
          (error: any) => {
            this._utility.routingAccordingToError(error);
          }
        )
    }catch(err){
      throw err
    }
  }

  fetchDepartments() {
    try{
      this._employeeService.getDepartmentsOfCompany().pipe(takeUntil(this._unsubscribe))
        .subscribe((response: any) => {
          this.departments = response.data
        },
        (error: any) => {
          this._utility.routingAccordingToError(error);
        }
      )
    }catch(err){
      throw err
    }
  }

  onSelectDepartment(event: any){
    this.fetchAllEmployees(event.target.value)
  }
  
  ngOnDestroy (){
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
