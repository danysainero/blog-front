import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TokenDTO } from './../../_data/token-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthProxyService {

  constructor(private httpClient: HttpClient) { }

  login(loginForm): Observable<TokenDTO> {

    const auth = btoa(`${loginForm.userName}:${loginForm.pass}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + auth
      })
    };

    return this.httpClient.post<TokenDTO>('http://localhost:3001/api/login/', '', httpOptions);

  }

  register(formBody): Observable<any> {
    return this.httpClient.post('http://localhost:3001/api/users/', formBody);
  }

   checkUserName(userName) {
    return  this.httpClient.put('http://localhost:3001/api/users/', {userName});
  }
}
