import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit() {
    // this.showLogin();
  }

  loggingOut(){
    alert("logging Out");
    localStorage.removeItem('currentUser')

    this.router.navigate(['/sign']);
  }

}
