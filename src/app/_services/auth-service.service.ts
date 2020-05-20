import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(login): Observable<any> {
    if (login.userName && login.pass) {
      const auth = btoa(`${login.userName}:${login.pass}`);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + auth
        })
      };
      return this.httpClient.post('http://localhost:3001/api/login/', '', httpOptions);
    }
  }

  register(formBody): Observable<any> {
    return this.httpClient.post('http://localhost:3001/api/users/', formBody);
  }
}
