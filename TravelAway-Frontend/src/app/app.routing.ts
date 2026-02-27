import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewPackagesComponent } from './view-packages/view-packages.component';
import { ViewPackageDetailsComponent } from './view-package-details/view-package-details.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { BookPackageComponent } from './book-package/book-package.component';
import { PaymentComponent } from './payment/payment.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { ViewHotelsComponent } from './view-hotels/view-hotels.component';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent ,data: { breadcrumb: 'Home' }},
  { path: 'viewPackages', component: ViewPackagesComponent ,data: { breadcrumb: 'viewPackages' } },
  { path: 'login/:loginRole', component: LoginComponent, data: { breadcrumb: 'login' } },
  { path: 'register', component: RegisterComponent ,data: { breadcrumb: 'register' }},
  { path: 'viewPackageDetails/:packageId/:packageName', component: ViewPackageDetailsComponent },
  { path: 'viewPackageDetails/:packageId/:packageName', component: ViewPackageDetailsComponent },
  { path: 'editDetails', component: EditDetailsComponent ,data: { breadcrumb: 'editDetails' }},
  { path: 'custcare', component: CustomerCareComponent ,data: { breadcrumb: 'custcare' }},
  { path: 'bookpkg/:packageId', component: BookPackageComponent },
  { path: 'payment', component: PaymentComponent ,data: { breadcrumb: 'payment' }},
  { path: 'addvehicle', component: AddVehicleComponent ,data: { breadcrumb: 'addvehicle' }},
  { path: 'addhotel', component: AddHotelComponent ,data: { breadcrumb: 'addhotel' }},
  { path: 'accommodation', component: AccommodationComponent ,data: { breadcrumb: 'accommodation' }},
  { path: 'viewbookings', component: ViewBookingsComponent ,data: { breadcrumb: 'viewbookings' }},
  { path: 'viewhotels', component: ViewHotelsComponent ,data: { breadcrumb: 'viewhotels' }},
  { path: 'viewvehicles', component: ViewVehiclesComponent ,data: { breadcrumb: 'viewvehicles' }},
  { path: '**', component: HomeComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
