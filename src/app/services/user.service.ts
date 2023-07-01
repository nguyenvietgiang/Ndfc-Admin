import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private templateName: string = 'Account';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getAuthorizationHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAccountList(): Observable<Account[]> {
    const url = `${this.apiUrl}/Auth/list-accounts`;
    const headers = this.getAuthorizationHeaders();
    return this.http.get<Account[]>(url, { headers });
  }

  downloadExcelFile(): Observable<Blob> {
    const url = `${this.apiUrl}/FileExtend/Account`;
    const headers = this.getAuthorizationHeaders();
    return this.http.get(url, { headers, responseType: 'blob' }).pipe(
      map((response: Blob) => response)
    );
  }

  downloadExcelTemplate(): Observable<Blob> {
    const url = `${this.apiUrl}/FileExtend/dowload-template/${this.templateName}`;
    const headers = this.getAuthorizationHeaders();
    return this.http.get(url, { headers, responseType: 'blob' }).pipe(
      map((response: Blob) => response)
    );
  }

  importExcelData(file: File): Observable<any> {
    const url = `${this.apiUrl}/FileExtend/import-excel/Account`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = this.getAuthorizationHeaders();
    return this.http.post(url, formData, { headers });
  }
}

