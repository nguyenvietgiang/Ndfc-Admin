import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Account } from '../models/account.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAccountList(): Observable<Account[]> {
    const url = `${this.apiUrl}/Account`;
    const token = this.cookieService.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Account[]>(url,{headers});
  }
}
