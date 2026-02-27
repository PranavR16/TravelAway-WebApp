import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewPackagesComponent } from './view-packages/view-packages.component';
import { ViewPackageDetailsComponent } from './view-package-details/view-package-details.component';
import { HomeComponent } from './home/home.component';
import { UserService } from '../travelAway-services/user-service/user.service';
import { PackageService } from '../travelAway-services/package-service/package.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { EmployeeLayoutComponent } from './layouts/employee-layout/employee-layout.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { BookPackageComponent } from './book-package/book-package.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { PaymentComponent } from './payment/payment.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { ViewHotelsComponent } from './view-hotels/view-hotels.component';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr'; 
import { AuthInterceptor } from '../travelAway-services/auth.interceptor';
import { AuthService } from '../travelAway-services/auth-service/authservice';
import { ProtectedComponent } from './protected/protected.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PopularPackagesComponent } from './popular-packages/popular-packages.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'; 
export function tokenGetter() { // Ensure 'export' is here
  return localStorage.getItem('authToken'); // Or your preferred storage key
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ViewPackagesComponent,
    ViewPackageDetailsComponent,
    HomeComponent,
    CommonLayoutComponent,
    UserLayoutComponent,
    EmployeeLayoutComponent,
    EditDetailsComponent,
    CustomerCareComponent,
    BookPackageComponent,
    AccommodationComponent,
    PaymentComponent,
    AddVehicleComponent,
    AddHotelComponent,
    ViewBookingsComponent,
    ViewHotelsComponent,
    ViewVehiclesComponent,
    ProtectedComponent,
    PopularPackagesComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule,routing,BrowserAnimationsModule,
    MatDialogModule,MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
        JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains : ['localhost:5001'], // Replace with your backend domain
        blacklistedRoutes: ['/api/auth/'], // Adjust as needed
      },
    }),
  ],
  providers: [PackageService, UserService,AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
