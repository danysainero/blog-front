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
  randomPic = ['pic-1.png', 'pic-3.png', 'pic-4.webp', 'pic-2.png' , 'pic-5.png', 'pic-3.png', 'pic-4.webp', 'pic-5.png', 'pic-4.webp', 'pic-2.png' , 'pic-5.png', 'pic-3.png'];

  constructor(private router: Router, private store: PostsStoreService) { }

  ngOnInit(): void {
    this.store.init();
    this.posts$ = this.store.get$();


  }

  showPost(id, index) {
    this.router.navigate([`home/${id}`], {queryParams: {i: index}});
  }

}
