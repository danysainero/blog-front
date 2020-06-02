import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_data/post';
import { PostStore } from '../../_services/bussiness/post-store';

@Component({
  selector: 'app-post-private-detail',
  templateUrl: './post-private-detail.component.html',
  styleUrls: ['./post-private-detail.component.scss']
})
export class PostPrivateDetailComponent implements OnInit {

  modifyCommentForm: FormGroup;
  newCommentForm: FormGroup;
  post$: Observable<Post>;
  displayNewPostForm = false;
  foo: any;

  constructor(
    private postStore: PostStore,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postStore.init(this.route.snapshot.params.id);
    this.post$ = this.postStore.get$();

    this.initializeForms();
  }

  createComment() {
    this.postStore.addComment$(this.route.snapshot.params.id, this.newCommentForm.value);
    this.displayNewPostForm = !this.displayNewPostForm;
  }

  deleteComment(commentId) {
    this.postStore.deleteComment$(commentId);
  }
  modifyComment(commentId, comment) {
    const commentContent = this.modifyCommentForm.get('commentContent').value.trim();
    comment !== '' ? comment.commentContent = commentContent : comment.commentContent = comment.commentContent;
    this.postStore.modifyComment$(commentId, comment);
    this.modifyCommentForm.reset();
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
