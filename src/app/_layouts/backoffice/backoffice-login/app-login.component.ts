import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('admin2', [Validators.required]),
      password: new FormControl('1234', [Validators.required])
    });
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    this.subLogin = this.authService.login(this.loginForm.value).subscribe(
      (tokenDTO: TokenDTO) => localStorage.setItem('token', tokenDTO.token),
      (error) => console.log(error)
    );
  }

  register(): void {
    this.subRegister = this.authService.register(this.registerForm.value).subscribe((res) => console.log(res));
  }
}
