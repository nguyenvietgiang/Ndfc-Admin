import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../models/player.model';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getPlayerList(): Observable<Player[]> {
    const url = `${this.apiUrl}/Player`;
    return this.http.get<any>(url).pipe(
      map((response: any) => response.content)
    );
  }

  addPlayer(playerData: FormData): Observable<Player> {
    const url = `${this.apiUrl}/Player`;
    const token = this.cookieService.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<Player>(url, playerData, { headers });
  }
  

  getPlayerById(id: string): Observable<Player> {
    const url = `${this.apiUrl}/Player/${id}`;
    return this.http.get<Player>(url);
  }

  deletePlayer(id: string): Observable<any> {
    const url = `${this.apiUrl}/Player/${id}`;
    const token = this.cookieService.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(url, { headers });
  }  

  downloadExcelFile(): Observable<Blob> {
    const url = `${this.apiUrl}/FileExtend/Player`;
    const token = this.cookieService.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(url, { headers,   responseType: 'blob' }).pipe(
      map((response: Blob) => response)
    );
  }
  
}


