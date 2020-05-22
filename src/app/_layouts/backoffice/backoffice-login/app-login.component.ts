import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonValidator } from 'src/app/helpers/common-validator';
import { AuthService } from 'src/app/_services/auth-service.service';
import { TokenDTO } from '../../../_data/auth-dto';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  registerForm: FormGroup;
  subLogin: Subscription;
  subRegister: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms(): void  {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });

    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required], [CommonValidator.userTaken]),
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

  ngOnDestroy(): void  {
    if (this.subLogin) { this.subLogin.unsubscribe(); }
    if (this.subRegister) { this.subRegister.unsubscribe(); }
  }
}
