import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';
import { CommonValidator } from 'src/app/helpers/common-validator';
import { Token } from 'src/app/_data/token';
import { AuthService } from 'src/app/_services/bussiness/auth-service.service';
import { UsersStoreService } from 'src/app/_services/bussiness/users.store';
import { AuthProxyService } from 'src/app/_services/proxys/auth-proxy.service';

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
  showLogin: boolean;
  errorTextLogin: string;
  user: any;
  tokenInfo: any;

  // tslint:disable-next-line: max-line-length
  constructor(private store: UsersStoreService, private authService: AuthService, private authProxyService: AuthProxyService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.showLogin = true;
    this.initializeForms();
  }

  register(): void {
    this.subRegister = this.authService.register(this.registerForm.value).subscribe(() => {
      this.showLogin = !this.showLogin;
    },
      (error) => console.log(error.statusText += ' : Usuario ya existe'));
  }

  login(): void {
    this.subLogin = this.authService.login(this.loginForm.value).subscribe(
      (token: Token) => {
        localStorage.setItem('token', token.token);
        this.tokenInfo = jwt_decode(token.token);
        this.store.addUser$(this.tokenInfo);
        this.ngZone.run(() => {
          this.router.navigate(['backoffice/app']);
        });
      },
      (error) => {
        this.errorTextLogin = ' username or password invalid ';
        console.log(error.statusText = 'fail in login');
      }
    );

    this.user = this.store.get$();

  }

  initializeForms(): void {
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

  ngOnDestroy(): void {
    if (this.subLogin) { this.subLogin.unsubscribe(); }
    if (this.subRegister) { this.subRegister.unsubscribe(); }
  }
}
