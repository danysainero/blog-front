import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthProxyService {

  constructor(private httpClient: HttpClient) { }

  login(httpOptions): Observable<any> {
    return this.httpClient.post('http://localhost:3001/api/login/', '', httpOptions);

  }

  register(formBody): Observable<any> {
    return this.httpClient.post('http://localhost:3001/api/users/', formBody);
  }

  checkUserName(userName) {
    return this.httpClient.get('http://localhost:3001/api/users/', userName);
  }
}
