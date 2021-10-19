import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { validateAllFormFields } from 'src/app/core/custom-validators/custom-validators';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<boolean>();
  departments: any[] = [
    {
      department_name: "Sales" 
    },
    {
      department_name: "Marketing and Sales" 
    },
    {
      department_name: "Marketing" 
    },
    {
      department_name: "Human Resources" 
    },
    {
      department_name: "Digital Marketing" 
    },
    {
      department_name: "Technical Department" 
    },
    {
      department_name: "App developers" 
    },
    {
      department_name: "Maintainance Department" 
    }
  ]

  addEmployeeForm: FormGroup = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),
  });

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utility: UtilityService
  ) { }

  ngOnInit(): void {
    if(this._activatedRoute.snapshot.params.id){
      this.setFormForUpdateDetails()
    }
  }

  setFormForUpdateDetails(){
     try{
      this._employeeService.getEmployeeById(this._activatedRoute.snapshot.params.id).pipe(takeUntil(this._unsubscribe))
        .subscribe((response: any) => {
            this.addEmployeeForm.patchValue(response.data)
          },
          (err)=>{
            throw err;
          }
        )
    }catch(err){
      throw err
    }
  }

  onSubmit(){
    if(this.addEmployeeForm.valid){
      if(this._activatedRoute.snapshot.params.id){
        const data = {
          ...this.addEmployeeForm.value,
          id: this._activatedRoute.snapshot.params.id
        }
        this.updateEmployee(data)
      }else{
        this.addEmployee(this.addEmployeeForm.value)
      }
    }else{
      validateAllFormFields(this.addEmployeeForm)
    }
  }

  addEmployee(data: any){
    try{
      this._employeeService.addEmployee(data).pipe(takeUntil(this._unsubscribe))
        .subscribe((response: any) => {
            this._utility.toastSuccess("Employee", "Added successfully !")
            this._router.navigateByUrl('/employee-list')
          },
          (error)=>{
            this._utility.routingAccordingToError(error);
          }
        )
    }catch(err){
      throw err;
    }
  }

  updateEmployee(data: any) {
    try{
      this._employeeService.updateEmployee(data).pipe(takeUntil(this._unsubscribe))
        .subscribe((response: any) => {
          this._utility.toastInfo("Employee", "Updated successfully !")
          this._router.navigateByUrl('/employee-list')
        })
    }catch(err){
      throw err;
    }
  }

  ngOnDestroy(){
    this._unsubscribe.next(true)
    this._unsubscribe.complete()
  }
}
