import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from 'src/app/_data/user';
import { AuthService } from 'src/app/_services/bussiness/auth-service.service';
import { NotificacionesBusService } from './notificaciones-bus.service';
import { Store } from './store';

@Injectable({ providedIn: 'root' })
export class UsersStoreService extends Store<User[]>{

    users = [];
    constructor(private authService: AuthService, private router: Router, private notificacionesBusService: NotificacionesBusService) {
        super();
    }
    init(): void {
        if (this.get()) { return; }
        const token = localStorage.getItem('token');
        if (token) {

            const tokenInfo = jwt_decode(token);
            const user = Object.assign({}, tokenInfo.body);
            this.store([...this.users, user]);
        }
    }


    login$(loginForm): any {
        const resService = this.authService.login(loginForm).pipe(
            tap((res) => {
                const users = this.get();
                localStorage.setItem('token', res.token);
                const tokenInfo = jwt_decode(res.token);
                const user = Object.assign({}, tokenInfo.body);
                this.store([...users, user]);
                this.router.navigate(['backoffice/app']);
            })
        ).toPromise()
            .then()
            .catch(
                (err) => {
                    this.notificacionesBusService.showError('fail in login');
                }
            );
    }

    logout() {
        this.store([]);
    }

}
