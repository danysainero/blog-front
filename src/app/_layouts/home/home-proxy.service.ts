import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HomeProxyService {

  constructor(private http: HttpClient) { }

  getAllPost(): Observable<any>{
    return this.http.get('http://localhost:3001/api/blog/posts');
  }
}
