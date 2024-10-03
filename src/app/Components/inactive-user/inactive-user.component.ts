import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.css']
})
export class InactiveUserComponent implements OnInit {
  employees: any;
  emp: any;
  isTable: boolean = false;

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
      console.log('IN EMMPLOYEES , No data found in local storage');
      this.router.navigate(['/sign']);
    }

    // ngoninit ends here
  }

  showTable() {
    this.isTable = true;
    this.inactiveEmployees();
  }

  clickBack() {
    if(this.isTable){
       this.router.navigate(['/']);
    }else{
    this.showTable();
    }
   
  }

  clickEdit(empId: any) {
    this.isTable = false;
    this.employeeService
      .getEmployeeById(empId)
      .pipe(first())
      .subscribe((response) => {
        this.emp = response;
        console.log('employee fetched', response);
      });
  }

  onUpdate(){
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

    if(this.emp.status=="active"){
      console.log(this.emp.status, "this is the status you sent");
      this.emp.status="1";
     
    }else{
      console.log(this.emp.status, "this is the status you sent");

      this.emp.status="0"
    }

    console.log("entered on activate button")

    this.employeeService.activateEmployee(this.emp).pipe(first()).subscribe((response) => {
      if (response != null) {
        console.log('update method call', response);
        this.showTable();
      }
    });
  }

  inactiveEmployees() {
    this.employeeService
      .inactiveEmployees()
      .pipe(first())
      .subscribe((response) => {
        this.employees = response;
        console.log('inactive users fetched', response);
      });
  }
}
