import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any;
  emp: any;
  isTable: boolean = false;
  // isTable : boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('userData');
    if (storedData !== null) {
      // const userData = JSON.parse(storedData);
      // this.UserService.onLogin(userData)
      //   .pipe(first())
      //   .subscribe((response: any) => {
      //     if (response != null) {
      //       if (response.serviceStatus == 'Fail') {
      //         // alert(response.serviceResponse);
      //         alert('Login Failed!!!');
      //         this.router.navigate(['/sign']);
      //         return;
      //       }
      //       console.log('login method call', response);
      this.showTable();
      // }
      // });
    } else {
      console.log('IN EMMPLOYEES , No data found in local storage- login to access');
      this.router.navigate(['/sign']);
    }

    // ngonin it ends here
  }

  showTable() {
    this.isTable = true;
    this.getAllEmployees();
  }

  private getAllEmployees() {
    this.employeeService
      .getAllEmployees()
      .pipe(first())
      .subscribe((response) => {
        if (response != null) {
          this.employees = response;
          console.log(' employee list fetched ', response);
        }
      });
  }

  clickUpdate(empId: any) {
    this.isTable = false;

    this.employeeService
      .getEmployeeById(empId)
      .pipe(first())
      .subscribe((response) => {
        if (response != null) {
          this.emp = response;
          console.log(' employee list fetched ', response);
        }
      });
  }

  clickBack() {
    this.isTable = true;
  }

  onUpdate() {
    if (
      this.emp.firstName == '' ||
      this.emp.firstName == null ||
      this.emp.firstName == undefined
    ) {
      alert('Please enter first name to proceed ');
      return;
    }

    if (
      this.emp.email == '' ||
      this.emp.email == null ||
      this.emp.email == undefined
    ) {
      alert('Please enter email to proceed ');
      return;
    }

    this.employeeService
      .updateEmployee(this.emp)
      .pipe(first())
      .subscribe((response) => {
        if (response != null) {
          console.log('update method call', response);
          this.showTable();
        }
      });
  }

  clickDelete(empId: any, fname: any, lname: any) {
    if (confirm(`Do you want to delete ${fname} ${lname}?`)) {
      this.employeeService
        .deleteEmployee(empId)
        .pipe(first())
        .subscribe((response) => {
          if (response != null) {
            console.log('delete method call', response);
            this.showTable();
          }
        });
    }
  }
}
