import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  login(username: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${environment.apiUrl}/Auth/login`, { username, password });
  }

  saveTokens(refreshToken: string, token: string): void {
    this.cookieService.set('refreshToken', refreshToken);
    this.cookieService.set('token', token);
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  getUserInfo(token: string): Observable<Auth> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Auth>(`${environment.apiUrl}/Auth/userinfo`, { headers });
  }

}
