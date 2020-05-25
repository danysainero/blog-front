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
