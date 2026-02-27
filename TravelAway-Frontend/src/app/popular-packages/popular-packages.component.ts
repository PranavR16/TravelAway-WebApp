import { Component, OnInit } from '@angular/core';
import { PopularPackage } from '../models/popular-package.model';
import { PackageService } from "../../travelAway-services/package-service/package.service";
@Component({
  selector: 'app-popular-packages',
  templateUrl: './popular-packages.component.html',
  styleUrls: ['./popular-packages.component.css']
})

export class PopularPackagesComponent implements OnInit {
  popularPackages: PopularPackage[] = [];
  errorMsg: string;
  showMsg: boolean;
  imagePath: string;
  topPackages: PopularPackage[] = [];
  constructor(private packageService: PackageService,) { }
  
  ngOnInit(): void {
    this.loadPopularPackages();
    if (this.popularPackages == null) {
      this.showMsg = true;
    }
    this.imagePath = "src/assets/"
  }
    loadPopularPackages() {
    this.packageService.getPackages().subscribe(
      responseGet => {
        this.showMsg = false;
        this.popularPackages = responseGet;
        this.topPackages = this.popularPackages.slice(0, 5);
      },
      resonseError => {
        this.showMsg = true
        this.popularPackages = null
        this.errorMsg = resonseError
      },
      () => console.log("GetPackage method executed")
    )
  }

  // loadPopularPackages() {
  //       this.popularPackages = [
  //     { id: 1, name: 'Romantic Bali', destination: 'Bali, Indonesia', price: 500, imageUrl: 'assets/bali.jpg' },
  //     { id: 2, name: 'Swiss Adventure', destination: 'Switzerland', price: 1000, imageUrl: 'assets/switzerland.jpg' }
  //   ];
  // }

}
