import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonValidator } from 'src/app/helpers/common-validator';
import { AuthService } from 'src/app/_services/bussiness/auth-service.service';
import { NotificacionesBusService } from 'src/app/_services/bussiness/notificaciones-bus.service';
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
  subRegister: Subscription;
  showLogin: boolean;
  usernameErrorsMessages;

  constructor(
    private userStore: UsersStoreService,
    private authService: AuthService,
    private notificacionesBusService: NotificacionesBusService,
    private authProxyService: AuthProxyService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {

    this.initializeForms();
    this.showLogin = true;
   
    this.usernameErrorsMessages = {
      required: 'El username es requerido',
      userTaken: 'Username is taken',
      minlength: 'Sorry, this field is too short',
      startWithNumber: 'El username no puede empezar por número'
      };
  }

  login(): void {
    this.userStore.login$(this.loginForm.value);
  }

  register(): void {
    this.subRegister = this.authService.register(this.registerForm.value).subscribe(() => {
      this.showLogin = !this.showLogin;
    },
      (error) => console.log(error.statusText += ' : Usuario ya existe'));
  }

  initializeForms(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });

    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required], [CommonValidator.userTaken]),
      pass: new FormControl('', [Validators.required, Validators.minLength(4)]),
      role: new FormControl(1)
    });
  }

  ngOnDestroy(): void {
    if (this.subRegister) { this.subRegister.unsubscribe(); }
  }
}
