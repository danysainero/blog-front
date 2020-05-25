import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProxyService } from '../proxys/auth-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authProxy: AuthProxyService) { }

  login(login){

    const auth = btoa(`${login.userName}:${login.pass}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + auth
      })
    };
    return this.authProxy.login(httpOptions);

  }

  register(formBody){
    return this.authProxy.register(formBody);
  }

  checkUserName(userName) {
    return this.authProxy.checkUserName(userName);
  }
}
