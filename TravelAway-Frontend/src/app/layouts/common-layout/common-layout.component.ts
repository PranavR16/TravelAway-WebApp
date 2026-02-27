import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterModule  } from '@angular/router';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css'],
  
})
export class CommonLayoutComponent implements OnInit {
  userType: '1' | '2' | '' = '';  // '1' for Customer, '2' for Employee

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to param changes to handle dynamic navigation like /login/1 or /login/2
    this.route.paramMap.subscribe(params => {
      this.userType = (params.get('loginRole') as '1' | '2') || '';
      this.updateForm();
      //console.log('User type:', this.userType);
    });
  }

  updateForm(): void {
    // Logic to handle changes in form based on user type
    if (this.userType === '1') {
      // Configure UI or form fields for Customer Login
      console.log('Displaying Customer Login');
    } else if (this.userType === '2') {
      // Configure UI or form fields for Employee Login
      console.log('Displaying Employee Login');
    } else {
      // Optional fallback
      console.warn('Unknown login type');
    }
  }
}
