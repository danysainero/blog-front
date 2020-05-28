import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from 'src/app/_data/user';
import { AuthService } from 'src/app/_services/bussiness/auth-service.service';
import { Store } from './store';


@Injectable({ providedIn: 'root' })
export class UsersStoreService extends Store<User[]>{

    constructor(private service: AuthService) {
        super();
    }

    /*   init(): Promise<Comment[]> {
         return this.service.pipe(tap(users => this.store(users))
         ).toPromise();
     }
  */

    addUserToStore$(user: User): Promise<User> {
        return this.service.checkUserName(user).pipe(
            tap(users => {
                this.store([...this.get(), users]);
            })).toPromise();
    }

}
