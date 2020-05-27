import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { DtoMapper } from 'src/app/helpers/dto-mapper';
import { Token } from 'src/app/_data/token';
import { User } from 'src/app/_data/user';
import { AuthProxyService } from '../proxys/auth-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authProxy: AuthProxyService,  private dtoMapper: DtoMapper, private router: Router) { }

  login(loginForm): Observable<Token> {

    return this.authProxy.login(loginForm).pipe(
      map(tokenDTO =>  this.dtoMapper.adaptDTOToToken(tokenDTO))
    );
  }

  register(formBody): Observable<User> {
    return this.authProxy.register(formBody).pipe(
      map(userDTO => this.dtoMapper.adaptDTOToUser(userDTO))
    );
  }

  checkUserName(userName): Observable<User> {
    return this.authProxy.checkUserName(userName).pipe(
      map(userDTO => this.dtoMapper.adaptDTOToUser(userDTO))
    );
  }

}
