import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';

interface NewsItem {
  id: string;
  title: string;
  image: string;
  description: string;
  detail: string;
  createOn: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getNews(): Observable<NewsItem[]> {
    const apiUrl = `${environment.apiUrl}/News`; 
    return this.http.get<NewsItem[]>(apiUrl).pipe(
      map((response: any) => response.content)
    );
  }

  deleteNew(id: string): Observable<any> {
    const apiUrl = `${environment.apiUrl}/News${id}`;
    const token = this.cookieService.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(apiUrl, { headers });
  }  
}
