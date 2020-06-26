import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Post } from 'src/app/_data/post';
import { PostsService } from 'src/app/_services/bussiness/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})

export class PostDetailComponent implements OnInit {

  post$: Observable<Post>;
  postUrlId: string;
  randomPic: string[] = ['pic-1.png', 'pic-3.png', 'pic-4.webp', 'pic-2.png', 'pic-5.png', 'pic-3.png', 'pic-4.webp', 'pic-5.png', 'pic-4.webp', 'pic-2.png', 'pic-5.png', 'pic-3.png'];
  picIndex: number;
  
  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPostByID();
    this.picIndex = this.route.snapshot.queryParams.i;
  }

  getPostByID() {
    this.postUrlId = this.route.snapshot.params.id;
    this.post$ = this.postsService.getPostsById(this.postUrlId);
  }

}
