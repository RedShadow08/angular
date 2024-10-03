import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Employee } from '../../employee';
import { EmployeeService } from '../../employee.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee = new Employee();
  name: boolean = true;
  isEmail: boolean = true;


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
            // this.showTable();
          // }
        // });
    } else {
      console.log('login to access,  No data found in local storage');
      this.router.navigate(['/sign']);
    }

    // ngoninit ends here
  }

  onAdd() {
    
    this.employeeService
      .verifyEmployee(this.employee.email)
      .pipe(first())
      .subscribe((response) => {
        if (response == null) {
          this.employee.status = '1';
          if (
            this.employee.firstName == '' ||
            this.employee.firstName == null ||
            this.employee.firstName == undefined
          ) {
            // alert('Please enter first name to proceed ');
            this.name = false;
            return;
          } else {
            this.name = true;
          }

          if (
            this.employee.email == '' ||
            this.employee.email == null ||
            this.employee.email == undefined
          ) {
            // alert('Please enter email to proceed ');
            this.isEmail = false;
            return;
          } else {
            this.isEmail = true;
          }

          this.employeeService
            .createEmployee(this.employee)
            .pipe(first())
            .subscribe((response) => {
              if (response != null) {
                console.log('create method call', response);

                this.router.navigate(['/employees']);
              }
            });
        } else {
          alert('Email already exist');
          this.router.navigate(['/create-employee'])
        }
      });
  }
}
