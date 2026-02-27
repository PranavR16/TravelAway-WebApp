import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
interface AuthResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44393/api/auth'; // Replace with your .NET API URL
  //private apiUrl ='https://localhost:44393/api/Auth/customer/login/CustomerLogin';
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) {}

  login(EmailId: string, UserPassword: string,loginRole: number): Observable<AuthResponse> {
    const Password=UserPassword;
    if (loginRole == 1) 
    {
    return this.http.post<AuthResponse>(`${this.apiUrl}/customer/login`, { EmailId: EmailId, UserPassword: UserPassword}).pipe(
      tap((response) => this.saveToken(response.token))
    );
    }
    if (loginRole == 2) 
    {
      return this.http.post<AuthResponse>(`${this.apiUrl}/employee/login`, { EmailId: EmailId, Password: Password}).pipe(
        tap((response) => this.saveToken(response.token))
      );
    }
  }

  logout(): void {
    this.clearToken();
    this.tokenSubject.next(null);
    // Optionally redirect the user to the login page
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
  }

    decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  getRole(): string | null {
    const decodedToken = this.decodeToken();
    console.log("decode",decodedToken);
    return decodedToken ? decodedToken['role'] : null; // Assuming your role claim is named 'role'
  }

  private clearToken(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
