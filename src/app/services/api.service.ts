import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly BASE_URL = 'https://dhcr.clarin-dariah.eu/api/v1';
  constructor(private http: HttpClient) { }

  getData(endpoint: string): Observable<any> {
    return this.http.get(this.BASE_URL + endpoint);
  }

  getUrl(endpoint: string): string {
    return this.BASE_URL + endpoint;
  }
}
