import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from 'src/app/_data/user';
import { AuthService } from 'src/app/_services/bussiness/auth-service.service';
import { Store } from './store';

@Injectable({ providedIn: 'root' })
export class UsersStoreService extends Store<User[]>{

    constructor(private authService: AuthService,  private router: Router ) {
        super();
    }
    init(): void {
      if (this.get()) { return; }
      const users = [];
      return this.store(users);
     }


    login$(loginForm): any {
        this.authService.login(loginForm).pipe(
            tap((res) => {
                const users = this.get();
                localStorage.setItem('token', res.token);
                const tokenInfo = jwt_decode(res.token);
                const user = Object.assign({}, tokenInfo.body);
                this.store([...users, user]);
                this.router.navigate(['backoffice/app']);
            })
        ).toPromise();
    }

    logout(){
      this.store([]);
    }

}
