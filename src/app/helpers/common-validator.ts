import { FormControl } from '@angular/forms';
import { AuthService } from '../_services/bussiness/auth-service.service';

export class CommonValidator {

    constructor(private authService: AuthService) { }
    static userTaken(control: FormControl) {

        return new Promise((resolve) => {
            setTimeout(() => {

                if (control.value === 'admin2') {
                    resolve({ userTaken: true });
                } else {
                    resolve(null);
                }
            }, 200);
        });
    }

}



/*     static checkNewUser(proxy: AuthProxyService) {
        return (control: FormControl) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let userExist;
                    proxy.checkUserName(control.value).subscribe(
                        res => { userExist = res; }
                    );
                    if (userExist) {
                        resolve({ checkNewUser: true });
                    } else {
                        resolve(null);
                    }
                }, 2000);
            });
        };
    } */
