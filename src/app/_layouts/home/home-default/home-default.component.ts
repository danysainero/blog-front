import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { PostsProxyService } from 'src/app/_services/posts-proxy.service';

@Component({
  selector: 'app-post-list-default',
  templateUrl: './home-default.component.html',
  styleUrls: ['./home-default.component.scss']
})
export class PostsListComponent implements OnInit {

  posts$: Observable<any>;
  postsSSubscription: Subscription;

  constructor(private postsProxyService: PostsProxyService) { }

  ngOnInit(): void {
    this.posts$ = this.postsProxyService.getAllPost();
  }

}
