// app.component.ts

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title="EmployeeManagementSystem"
  showNavbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !this.router.getCurrentNavigation()?.extras.state?.['hideNav'];
      }
    });
  }
  shouldDisplayNavbar(): boolean {
    // Check if current route is not the login page
    return this.router.url !== '/sign';
  }
}
