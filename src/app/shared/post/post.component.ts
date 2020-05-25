import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Post } from 'src/app/_data/post';
import { PostsService } from 'src/app/_services/bussiness/posts.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPost();
   }

  getAllPost() {
    this.posts$ = this.postsService.gelAllPosts();
  }

  showPost(id) {
    this.router.navigate([`home/${id}`]);
  }
}
