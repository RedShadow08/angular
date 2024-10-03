import { first } from 'rxjs';
import { UserService } from './../../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {
  isLogin: boolean = false;
  isEmail: boolean = false;
  isOtp: boolean = false;

  credentials: any = {
    email: '',
    password: '',
    name: '',
  };

  changePassword: any = {
    email: '',
    otp1: '',
    otp2: '',
    passwd1: '',
    passwd2: '',
  };
  // let users=new credentials();

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit() {
    this.onStart();
    // this.showLogin();
  }

  // forgotPassword(email:any, otp:any,){
  //   this.isEmail=email;
  //   this.isOtp=otp;

  // }

  showForgot(email: any, otp: any) {
    if (email && !otp) {
      this.isEmail = email;
      this.isOtp = otp;
    } else if (!email && otp) {
      // enter email view opens
      this.UserService.onForgot(this.changePassword.email)
        .pipe(first())
        .subscribe((response: any) => {
          if (response != null) {
            console.log('forgot method call', response);
            // alert("success")
            this.changePassword.otp1 = response;

            this.isEmail = email;
            this.isOtp = otp;
          } else {
            alert('Not a Registered Email');
          }
        });
    } else if (email && otp) {
      // enter new password view opens
      if (this.changePassword.otp1 == this.changePassword.otp2) {
        this.isEmail = email;
        this.isOtp = otp;
      } else {
        alert('Enter the correct OTP ');
        // this.isEmail = true;
        // this.isOtp = false;
      }
    } else {
      if (this.changePassword.passwd1 == this.changePassword.passwd2) {
        this.UserService.onPasswordChange(this.changePassword)
          .pipe(first())
          .subscribe((response: any) => {
            if (response != null) {
              console.log('change password method call', response);
              alert('Password Changed');
              this.isEmail = email;
              this.isOtp = otp;
            }
          });
      } else {
        alert('Enter the correct password ');
      }
    }
  }

  onRegister() {
    console.log(this.credentials, 'credit at register');

    if (this.credentials.email == '' || this.credentials.email == null) {
      alert('enter your email');
      return;
    } else if (this.credentials.name == '' || this.credentials.name == null) {
      alert('enter your name');
      return;
    } else if (
      this.credentials.password == '' ||
      this.credentials.password == null
    ) {
      alert('enter your password');
      return;
    } else {
      this.UserService.onRegister(this.credentials)
        .pipe(first())
        .subscribe((response: any) => {
          if (response != null) {
            console.log('register method call', response);
            console.log(this.credentials, 'after registered');
            this.showLogin();
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.credentials = {
              email: '',
              name: '',
              password: '',
            };
            alert('Registered!!!');
          }
        });
    }
  }

  onLogin() {
    console.log(this.credentials, 'credit at login');

    if (this.credentials.email == '' || this.credentials.email == null) {
      alert('enter your email');
      return;
    } else if (
      this.credentials.password == '' ||
      this.credentials.password == null
    ) {
      alert('enter your password');
      return;
    } else {
      this.UserService.onLogin(this.credentials)
        .pipe(first())
        .subscribe((response: any) => {
          if (response != null) {
            if (response.serviceStatus == 'Fail') {
              // alert(response.serviceResponse);
              return;
            }
            console.log('login method call', response);
            console.log(this.credentials, 'after logged in');
            this.credentials.password = null;
            this.saveData(this.credentials);
            // alert(response.serviceResponse)
            this.router.navigate(['/employees']);
            // alert('Logged In!!!');
          }
        });
    }
  }

  // saving data in local storage
  saveData(data: any) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  onStart() {
    const storedData = localStorage.getItem('userData');
    if (storedData !== null) {
      // const userData = JSON.parse(storedData);
      //     this.UserService.onLogin(userData)
      //       .pipe(first())
      //       .subscribe((response: any) => {
      //         if (response != null) {
      //           if (response.serviceStatus == 'Fail') {
      //             // alert(response.serviceResponse);
      //             return;
      //           }
      //           console.log('login method call', response);
      //           console.log(this.credentials, 'after logged in');
      // //           // this.saveData(this.credentials);
      //           // alert(response.serviceResponse)
      this.router.navigate(['/employees']);
      // }
      // });
    } else {
      console.log('No data found in local storage, please LogIn');
      this.showLogin();
    }
  }

  showLogin() {
    this.isLogin = true;
  }
  signUp() {
    this.isLogin = false;
  }
  signIn() {
    this.showLogin();
  }
}
