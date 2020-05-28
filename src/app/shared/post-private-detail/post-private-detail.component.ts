import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Comment } from 'src/app/_data/comment';
import { Post } from 'src/app/_data/post';
import { PostsService } from 'src/app/_services/bussiness/posts.service';
import { PostsStoreService } from 'src/app/_services/bussiness/posts.store';
import { CommentsService } from '../../_services/bussiness/comments.service';
import { CommentsStoreService } from './../../_services/bussiness/comments-store';

@Component({
  selector: 'app-post-private-detail',
  templateUrl: './post-private-detail.component.html',
  styleUrls: ['./post-private-detail.component.scss']
})
export class PostPrivateDetailComponent implements OnInit {

  modifyCommentForm: FormGroup;
  newCommentForm: FormGroup;
  comments$: Observable<Comment[]>;
  post$: Observable<Post>;
  displayNewPostForm = false;

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
    private commentsStore: CommentsStoreService,
    private postsStore: PostsStoreService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.commentsStore.init(this.route.snapshot.params.id);
    this.comments$ = this.commentsStore.get$();
    this.post$ = this.postsService.getPostsById(this.route.snapshot.params.id);
    this.initializeForms();
  }

  async  createComment() {
    await this.commentsStore.createComment$(this.route.snapshot.params.id, this.newCommentForm.value);
    this.newCommentForm.reset();
    this.displayNewPostForm = !this.displayNewPostForm;
  }

  modifyComment(commentId, comment) {
    const commentContent = this.modifyCommentForm.get('commentContent').value.trim();
    comment !== '' ? comment.commentContent = commentContent : comment.commentContent = comment.commentContent;
    this.commentsStore.modifyComment$(commentId, comment);
    this.modifyCommentForm.reset();
  }

deleteComment(commentId) {
  this.commentsStore.deleteComment$(commentId);
}

initializeForms() {
  this.newCommentForm = new FormGroup({
    commentContent: new FormControl('', [Validators.required])
  });

  this.modifyCommentForm = new FormGroup({
    commentContent: new FormControl('', [Validators.required])
  });
}

}
