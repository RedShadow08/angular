import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpClient ) { }

  baseURL= "http://localhost:8080/users";

  onLogin(users: any){
    return this.http.post(`${this.baseURL}/login`, users);
  }

  onRegister(users: any){
    return this.http.post(`${this.baseURL}/register`, users);
  }

  onForgot(email: any){
    return this.http.post(`${this.baseURL}/forgot/${email}`, email);
  }

  onPasswordChange(users: any){
    return this.http.post(`${this.baseURL}/changePassword`, users);
  }

}
