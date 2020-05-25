import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Token } from 'src/app/_data/token';
import { User } from 'src/app/_data/user';
import { UserDTO } from 'src/app/_data/user-dto';
import { AuthProxyService } from '../proxys/auth-proxy.service';
import { TokenDTO } from './../../_data/token-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authProxy: AuthProxyService, private router: Router) { }

  login(loginForm): Observable<Token> {

    return this.authProxy.login(loginForm).pipe(
      map(tokenDTO => this.adaptDTOToToken(tokenDTO))
    );
  }

  register(formBody) {
    return this.authProxy.register(formBody).pipe(
      map(userDTO => this.adaptDTOToUser(userDTO))
    );
  }

  checkUserName(userName) {
    return this.authProxy.checkUserName(userName);
  }


  private adaptDTOToToken(tokenDTO: TokenDTO): Token {
    return {
      message: tokenDTO.messageDTO,
      token: tokenDTO.tokenDTO
    };
  }

  private adaptTokenTODTO(token: Token): TokenDTO {
    return {
      messageDTO: token.message,
      tokenDTO: token.token
    };
  }


  private adaptDTOToUser(userDTO: UserDTO): User {
    return {
      UserRole: userDTO.role,
      UserId: userDTO._id,
      UserUserName: userDTO.userName
    };
  }

  private adaptUserTODTO(user: User): UserDTO {
    return {
      role: user.UserRole,
      _id: user.UserId,
      userName: user.UserUserName
    };
  }
}
