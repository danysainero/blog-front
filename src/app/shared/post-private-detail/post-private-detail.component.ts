import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { Post } from 'src/app/_data/post';
import { PostsService } from 'src/app/_services/bussiness/posts.service';
import { CommentsService } from '../../_services/bussiness/comments.service';

@Component({
  selector: 'app-post-private-detail',
  templateUrl: './post-private-detail.component.html',
  styleUrls: ['./post-private-detail.component.scss']
})
export class PostPrivateDetailComponent implements OnInit, OnDestroy {

  modifyCommentForm: FormGroup;
  newCommentForm: FormGroup;
  post$: Observable<Post>;
  displayNewPostForm = false;
  createCommentSub: Subscription;
  modifyCommentSub: Subscription;
  deleteCommentSub: Subscription;
  newPostError: object;

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPostByID();
    this.initializeForms();

  }

  initializeForms() {
    this.newCommentForm = new FormGroup({
      commentContent: new FormControl('', [Validators.required])
    });

    this.modifyCommentForm = new FormGroup({
      commentContent: new FormControl('', [Validators.required])
    });
  }

  getPostByID() {
    const postUrlId = this.route.snapshot.params.id;
    this.post$ = this.postsService.getPostsById(postUrlId);
  }

  createComment() {
    const postUrlId = this.route.snapshot.params.id;
    this.createCommentSub = this.commentsService.createComment(postUrlId, this.newCommentForm.value).subscribe(() => {
      this.displayNewPostForm = !this.displayNewPostForm;
    },
      (error) => {
        this.newPostError = error.error.message;
      }
    );
  }

  modifyComment(commentId) {
    this.modifyCommentSub = this.commentsService.modifyComment(commentId, this.modifyCommentForm.value).subscribe(
      (res) => res,
      (error) => console.log(error.statusText)
    );
  }

  deleteComment(commentId) {
    this.deleteCommentSub = this.commentsService.deleteComment(commentId).subscribe(
      (res) => res,
      (error) => console.log(error.statusText)
    );
  }

  ngOnDestroy() {
    if (this.createCommentSub) { this.createCommentSub.unsubscribe(); }
    if (this.modifyCommentSub) { this.modifyCommentSub.unsubscribe(); }
    if (this.deleteCommentSub) { this.deleteCommentSub.unsubscribe(); }
  }

}
