import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { PostDTO } from 'src/app/_dtos/post-dto';
import { CommentsProxyService } from 'src/app/_services/comments-proxy.service';
import { PostsProxyService } from 'src/app/_services/posts-proxy.service';

@Component({
  selector: 'app-post-private-detail',
  templateUrl: './post-private-detail.component.html',
  styleUrls: ['./post-private-detail.component.scss']
})
export class PostPrivateDetailComponent implements OnInit {

  modifyCommentForm: FormGroup;
  newCommentForm: FormGroup;
  post$: Observable<PostDTO>;
  postUrlId: string;
  displayNewPostForm: boolean;
  createCommentSub: Subscription;
  modifyCommentSub: Subscription;
  deleteCommentSub: Subscription;

  constructor(
    private postsProxyService: PostsProxyService,
    private commentsProxyService: CommentsProxyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.displayNewPostForm = false;
    this.postUrlId = this.route.snapshot.params.id;
    this.getPostByID(this.postUrlId);

    this.newCommentForm = new FormGroup({
      commentContent: new FormControl('', [Validators.required])
    });

    this.modifyCommentForm = new FormGroup({
      commentContent: new FormControl('', [Validators.required])
    });
  }

  getPostByID(postId) {
    this.post$ = this.postsProxyService.getPostsById(postId);
  }

  createComment() {
   this.createCommentSub = this.commentsProxyService.addCommentById(this.postUrlId, this.newCommentForm.value).subscribe();
  }

  modifyComment(commentId){
    this.modifyCommentSub =   this.commentsProxyService.modifyComment(commentId, this.modifyCommentForm.value).subscribe();
  }

  deleteComment(commentId) {
   this.deleteCommentSub = this.commentsProxyService.deleteComment(commentId).subscribe();
  }

  showNewCommentForm() {
    this.displayNewPostForm = !this.displayNewPostForm;
  }

  /* ngOnDestroy(){
    this.createCommentSub.unsubscribe();
    this.modifyCommentSub.unsubscribe();
    this.deleteCommentSub.unsubscribe();
  } */

}
