import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersStoreService } from 'src/app/_services/bussiness/users.store';
import { User } from './../../_data/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

logged: boolean;
user: Observable<User[]>;
  constructor(   private userStore: UsersStoreService, private router: Router) { }

  ngOnInit(): void {
    this.userStore.init();
    this.user = this.userStore.get$();
  }

  logout(){
    localStorage.clear();
    this.userStore.logout();
    this.router.navigate(['home']);
  }
}
