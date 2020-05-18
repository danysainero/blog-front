import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth-service.service';
import { TokenDTO } from '../../../_dtos/auth-dto';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  subLogin: Subscription;
  subRegister: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });

    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
      role: new FormControl(1)
    });
  }

  register(): void {
    this.subRegister = this.authService.register(this.registerForm.value).subscribe();
  }

  login(): void {
   this.subLogin = this.authService.login(this.loginForm.value).subscribe(
      (tokenDTO: TokenDTO) => {
        localStorage.setItem('token', tokenDTO.token);
        this.router.navigate(['backoffice/app']);
      },
      (error) => console.log(error)
    );
  }

  /* ngOnDestroy(){
    this.subLogin.unsubscribe();
    this.subRegister.unsubscribe();
  } */
}
