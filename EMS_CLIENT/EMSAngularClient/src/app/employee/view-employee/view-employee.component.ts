import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<boolean>()
  employeeDetail: any = {}

  constructor(
    private _employeeService: EmployeeService,
    private _activatedRoute: ActivatedRoute,
    private _utility: UtilityService
  ) { }

  ngOnInit(): void {
    this.fetchEmployeeDetails()
  }

  fetchEmployeeDetails(){
    try{
      this._employeeService.getEmployeeById(this._activatedRoute.snapshot.params.id).pipe(takeUntil(this._unsubscribe))
        .subscribe((response: any) => {
            this.employeeDetail = response.data
          },
          (error)=>{
            this._utility.routingAccordingToError(error);
          }
        )
    }catch(err){
      throw err
    }
  }

  ngOnDestroy(){
    this._unsubscribe.next(true)
    this._unsubscribe.complete()
  }
}
