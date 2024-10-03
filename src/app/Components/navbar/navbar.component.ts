import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit() {
    // this.showLogin();
  }

  loggingOut(){
    alert("logging Out");
    localStorage.removeItem('userData')

    this.router.navigate(['/sign']);
  }

}

