import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

  postCategory(websiteLink: String): Observable<any> {
      return this.http.post('/api/category', {websiteLink});
  }
}
