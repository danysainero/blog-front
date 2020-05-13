import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { HomeProxyService } from './../home-proxy.service';

@Component({
  selector: 'app-home-default',
  templateUrl: './home-default.component.html',
  styleUrls: ['./home-default.component.scss']
})
export class HomeDefaultComponent implements OnInit, OnDestroy {

  posts: Observable<any>;
  postsSSubscription: Subscription;

  constructor(private homeProxy: HomeProxyService) { }

  ngOnInit(): void {
    this.postsSSubscription = this.homeProxy.getAllPost().subscribe((res) => {
      this.posts = res;
    });
  }

  ngOnDestroy(): void{
    this.postsSSubscription.unsubscribe();
  }
}
