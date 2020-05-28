import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Post } from 'src/app/_data/post';
import { PostsStoreService } from 'src/app/_services/bussiness/posts.store';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private router: Router, private store: PostsStoreService) { }

  ngOnInit(): void {
    this.store.init();
    this.posts$ = this.store.get$();
  }

  showPost(id) {
    this.router.navigate([`home/${id}`]);
  }
}
