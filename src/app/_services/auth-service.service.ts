import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TokenDTO } from '../_dtos/auth-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(formBody): Observable<TokenDTO> {
    const auth = btoa(`${formBody.username}:${formBody.password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + auth
      })
    };
    return this.http.post<TokenDTO>('http://localhost:3001/api/login', '', httpOptions);
  }

  register(formBody): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/users/', formBody);

  }
}
