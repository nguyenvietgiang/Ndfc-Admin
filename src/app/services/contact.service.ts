import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Contact, CreateContactRequest } from '../models/contact.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }
 
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<any>(`${this.apiUrl}/Contact`).pipe(
      map(response => response.content)
    );
  }
  createContact(contact: CreateContactRequest): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/Contact`, contact);
  }

  sendFeedback(formData: any): Observable<any> {
    const url = `${this.apiUrl}/SendFeedback`;
    const token = this.cookieService.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(url, formData, { headers });
  }
  
}

