import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_data/post';
import { User } from 'src/app/_data/user';
import { PostStore } from '../../_services/bussiness/post-store';
import { UsersStoreService } from './../../_services/bussiness/users.store';

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
  user$: User[];

  constructor(
    private postStore: PostStore,
    private usersStore: UsersStoreService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postStore.init(this.route.snapshot.params.id);
    this.post$ = this.postStore.get$();
    this.usersStore.get$().subscribe(res => this.user$ = res);
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
    const commentContent = this.modifyCommentForm.get('commentContent').value;

    if (commentContent !== '') {
      comment.commentContent = commentContent;
      this.postStore.modifyComment$(commentId, comment);
      this.modifyCommentForm.reset();
    }
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
