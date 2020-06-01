import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from 'src/app/_data/user';
import { AuthService } from 'src/app/_services/bussiness/auth-service.service';
import { Store } from './store';


@Injectable({ providedIn: 'root' })
export class UsersStoreService extends Store<User[]>{

    constructor(private service: AuthService, ) {
        super();
    }
    /*  init(): Promise<any> {
         return this.service.login().pipe(tap(posts => this.store(posts))
         ).toPromise();
     }*/

    addUser$(token): any {
        (token).pipe(
            tap(user => {
                this.store([...this.get(), user]);
            })).toPromise();
    }

}
