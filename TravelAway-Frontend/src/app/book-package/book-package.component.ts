import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PackageService } from '../../travelAway-services/package-service/package.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IBookPackage } from '../travelAway-interfaces/BookPackage';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-book-package',
  templateUrl: './book-package.component.html',
  styleUrls: ['./book-package.component.css']
})
export class BookPackageComponent implements OnInit {
  @ViewChild('confirmationDialogTemplate') confirmationDialogTemplate!: TemplateRef<any>;
  bookingId: number;
  packageId: number;
  errorMsg: string;
  userRole: string;
  packageName: string;
  dialogTitle: string = '';
  dialogMessage: string = '';
  dialogRef: any;
  constructor(private packageService: PackageService, private router: Router,private route: ActivatedRoute,private tostr: ToastrService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.packageId = parseInt(this.route.snapshot.params['packageId']);
    this.packageName = this.route.snapshot.queryParams['name'];
    console.log(this.packageName);
    this.userRole = sessionStorage.getItem('userRole');
    if (this.userRole != "Customer") {
      this.router.navigate(['/login/1']);
    }
  }
  ngAfterViewInit() {
    
  }
  submitBookForm(form: NgForm) {
    var email = sessionStorage.getItem("userName");

    var bookpkg: IBookPackage = {
      contactNumber: parseInt(form.value.contactNumber), emailId: email, address: form.value.address, dateOfTravel: new Date(form.value.dateOfTravel), numberOfAdults: parseInt(form.value.adults),
      numberOfChildren: parseInt(form.value.children), status: "Booked", packageId: this.packageId
    }
    console.log(bookpkg);
    this.packageService.bookPackage(bookpkg).subscribe(
        responseRegisterStatus => {
        this.bookingId = responseRegisterStatus;
        if (this.bookingId > 0) {
          sessionStorage.setItem('bookingId', this.bookingId.toString());
          this.tostr.success('Booking Done successfully', 'Success');
          // this.dialogTitle = 'Continue to Accommodation?';
          // this.dialogMessage = 'Do you want to proceed to book accommodation?';
          // this.dialogRef = this.dialog.open(this.confirmationDialogTemplate,{width: '400px',panelClass: 'custom-dialog-top-center'});
          // this.dialogRef.afterClosed().subscribe((result: boolean) => {
          // if (result) {this.router.navigate(['/accommodation']);}
          // else {this.router.navigate(['/viewbookings']);}
    //});
          
          if (confirm("Booking Done successfully.Do you want to continue to book accommodation?")) {
            this.router.navigate(['/accommodation']);
          } else {
            this.router.navigate(['/viewbookings']);
          }
        } 
        else 
        { this.tostr.error('Booking Failed', 'Error');} 
        },
        responseRegisterError => {
          this.errorMsg = responseRegisterError;
        },
        () => console.log("BookingPackage method executed successfully")
    );

  }
  closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }
}
