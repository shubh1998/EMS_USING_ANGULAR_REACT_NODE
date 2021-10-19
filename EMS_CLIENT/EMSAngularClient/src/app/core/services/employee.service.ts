import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  baseURL: string = environment.baseUrl

  constructor(
    private _http: HttpClient
  ) { }

  getEmployeeList(department: string): Observable<any> {
    return this._http.get(`${this.baseURL}/all/employees?department=${department}`)
  }

  addEmployee(data: any): Observable<any> {
    return this._http.post(`${this.baseURL}/employee/add`, data, {
      observe : "response"
    })
  }

  updateEmployee(data: any): Observable<any> {
    let PARAMS = new HttpParams().set("id", data.id)
    delete data.id
    return this._http.patch(`${this.baseURL}/update/user`, data, {
        params: PARAMS
      }
    )
  }

  getEmployeeById(id: any): Observable<any> {
    return this._http.get(`${this.baseURL}/getuserbyid?id=${id}`)
  }

  deleteEmployee(id: any): Observable<any> {
    return this._http.delete(`${this.baseURL}/deleteuserbyid?id=${id}`)
  }

  getDepartmentsOfCompany(): Observable<any> {
    return this._http.get(`${this.baseURL}/company/departments`)
  }
}
