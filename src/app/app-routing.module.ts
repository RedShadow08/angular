import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './Components/login-signup/login-signup.component';
import { CreateEmployeeComponent } from './Components/create-employee/create-employee.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { InactiveUserComponent } from './Components/inactive-user/inactive-user.component';

const routes: Routes = [
  {path:"sign", component:LoginSignupComponent},
  {path:'', redirectTo:'sign', pathMatch:'full'},
  {path:'employees', component: EmployeeListComponent},
  {path:'create-employee', component: CreateEmployeeComponent},
  {path:'inactive-employee', component: InactiveUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
