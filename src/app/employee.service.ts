import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  

 
  private baseURL= "http://localhost:8080/employee";

  constructor(private http :HttpClient) { }

  getAllEmployees(){
    return this.http.get(`${this.baseURL}/list`);
  }

  createEmployee(employee: Employee){
    return this.http.post(`${this.baseURL}/add`, employee);
  }

  getEmployeeById(empId: any) {
    return this.http.get(`${this.baseURL}/id/${empId}`, empId);
  }

  updateEmployee(emp: any) {
    return this.http.post(`${this.baseURL}/update`, emp);
  }

  deleteEmployee(empId:any) {
    return this.http.delete(`${this.baseURL}/delete/${empId}`);
  }

  inactiveEmployees(){
    return this.http.get(`${this.baseURL}/inactive`);
  }

  activateEmployee(emp: any) {
    return this.http.post(`${this.baseURL}/activate`, emp);
  }

    verifyEmployee(email:any){
      return this.http.get(`${this.baseURL}/verify/${email}`);
    }

}
