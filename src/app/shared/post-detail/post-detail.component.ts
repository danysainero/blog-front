import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PostDTO } from 'src/app/_dtos/post-dto';
import { PostsService } from 'src/app/_services/posts-service.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Observable<PostDTO>;
  postUrlId: string;


  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPostByID();
  }

  getPostByID() {
    this.postUrlId = this.route.snapshot.params.id;
    this.post = this.postsService.getPostsById(this.postUrlId);
  }

}
