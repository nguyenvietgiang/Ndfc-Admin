import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Account } from '../models/account.model';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAccountList(): Observable<Account[]> {
    const url = `${this.apiUrl}/Auth/list-accounts`;
    const token = this.cookieService.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Account[]>(url,{headers});
  }

  downloadExcelFile(): Observable<Blob> {
    const url = `${this.apiUrl}/FileExtend/Account`;
    const token = this.cookieService.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(url, { headers,   responseType: 'blob' }).pipe(
      map((response: Blob) => response)
    );
  }
}
