import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.router.events
  //     .pipe(
  //       filter((event) => event instanceof NavigationEnd),
  //       map(() => this.buildBreadcrumb(this.activatedRoute.root))
  //     )
  //     .subscribe((breadcrumbs) => {
  //       this.breadcrumbs = breadcrumbs;
  //     });
  // }
ngOnInit(): void {
  this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumb(this.activatedRoute.root))
    )
    .subscribe((breadcrumbs) => {
      console.log('Breadcrumbs:', breadcrumbs); // Debugging
      this.breadcrumbs = breadcrumbs;
    });
}
  private buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string; url: string }> = []): Array<{ label: string; url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.buildBreadcrumb(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}