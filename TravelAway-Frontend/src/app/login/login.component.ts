import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute,ParamMap} from '@angular/router';
import { UserService } from "../../travelAway-services/user-service/user.service";
import { Subscription } from 'rxjs'; 
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/travelAway-services/auth-service/authservice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status: number;
  errorMsg: string;
  msg: string;
  showDiv: boolean = false;
  name: string;
  loginRole: number;
  rolename: string;
  routeSubscription: Subscription;
  constructor(
    private userService: UserService, 
    private router: Router, 
    private route: ActivatedRoute,
    private toastr:ToastrService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
      this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
        const role = params.get('loginRole');
        if (role === '1') {
          this.loginRole = 1;
          this.rolename = "Customer";
        } else if (role === '2') {
          this.loginRole = 2;
          this.rolename = "Employee";
        } else {
          this.loginRole = 0;
          this.rolename = '';
        }
        console.log('Login Role Updated:', this.loginRole, 'Rolename:', this.rolename);
        // You might want to update any UI elements that depend on rolename here
      });
  }
  submitLoginForm(form: NgForm) {
    console.log(form.value.email, form.value.password);
 
      this.authService.login(form.value.email, form.value.password,this.loginRole).subscribe({
      next: (response) => {
        this.showDiv = true;
          this.toastr.success("Login Successful");
          this.msg = "Login Successful";
          const role = this.authService.getRole();
          //console.log('User Role:', role);
          if(role == "Customer")
          {
          sessionStorage.setItem('userName', form.value.email);
          sessionStorage.setItem('userRole', "Customer");
          }
          else if(role == "Employee")
          {
            sessionStorage.setItem('userName', form.value.email);
            sessionStorage.setItem('userRole', "Employee");
          }
          this.router.navigate(['/home']);
          console.log('Login successful', response);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMsg= 'Invalid username or password.';
      },
    });


    // this.userService.validateCredentials(form.value.email, form.value.password, this.loginRole).subscribe(
    //   responseLoginStatus => {
    //     this.status = responseLoginStatus;
    //     this.showDiv = true;
    //     if (this.status==1) {
    //       this.toastr.success("Login Successful");
    //       this.msg = "Login Successful";
    //       sessionStorage.setItem('userName', form.value.email);
    //       sessionStorage.setItem('userRole', "Customer");
    //       this.router.navigate(['/home']);
    //     }
    //     else if (this.status == 2) {
    //       this.toastr.success("Login Successful");
    //       this.msg = "Login Successful";
    //       sessionStorage.setItem('userName', form.value.email);
    //       sessionStorage.setItem('userRole', "Employee");
    //       this.router.navigate(['/home']);
    //     }
      //   else {
      //     this.toastr.success("Try again with valid credentials.");
      //     this.msg = "Try again with valid credentials.";
      //   }
      // },
      // responseLoginError => {
      //   this.errorMsg = responseLoginError;
      // },
    //   () => console.log("SubmitLoginForm method executed successfully")
    // );
  }
}
