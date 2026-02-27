// protected.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-protected',
  template: `
    <h2>Protected Data</h2>
    <div *ngIf="data">{{ data.message }} - User: {{ data.user }}</div>
    <div *ngIf="error">{{ error }}</div>
  `,
})
export class ProtectedComponent implements OnInit {
  data: any;
  error: any;
  private apiUrl = 'https://localhost:44393/api/TravelAway'; // Replace with your .NET API URL

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe({
      next: (response) => (this.data = response),
      error: (err) => (this.error = 'Failed to load protected data.'),
    });
  }
}