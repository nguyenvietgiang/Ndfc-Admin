import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Contact, CreateContactRequest } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }
 
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/Contact`);
  }

  createContact(contact: CreateContactRequest): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/Contact`, contact);
  }

  sendFeedback(mail: string, bodyString: string): Observable<any> { 
    const url = `${this.apiUrl}/SendFeedback`;
    const token = this.cookieService.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    const body = { mail, bodyString };
    return this.http.post(url,body,{headers});
  }
}

