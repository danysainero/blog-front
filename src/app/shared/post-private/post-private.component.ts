import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/_data/post';
import { PostsService } from 'src/app/_services/bussiness/posts.service';
import { Helper } from './../../helpers/helper';
@Component({
  selector: 'app-post-private',
  templateUrl: './post-private.component.html',
  styleUrls: ['./post-private.component.scss']
})
export class PostPrivateComponent implements OnInit, OnDestroy {

  newPostForm: FormGroup;
  displayNewPostForm = false;
  posts$: Observable<Post[]>;
  modifyPostSub: Subscription;
  deleteSub: Subscription;
  saveSub: Subscription;
  createPosstSub: Subscription;

  constructor(
    private router: Router,
    private postsService: PostsService,
    private helper: Helper) { }

  ngOnInit(): void {
    this.getAllPost();

    this.newPostForm = new FormGroup({
      postAuthorName: new FormControl('', [Validators.required]),
      postAuthorNickName: new FormControl('', [Validators.required]),
      postTitle: new FormControl('', [Validators.required]),
      postContent: new FormControl('', [Validators.required])
    });
  }

  getAllPost() {
    this.posts$ = this.postsService.gelAllPosts();
  }

  createPost() {
    this.createPosstSub = this.postsService.createPost(this.newPostForm.value).subscribe(() => {
      window.location.reload();
    });
  }

  modifyPost(ev, indexItem) {
    this.helper.makePostWritable(indexItem, ev);
  }

  deletePost(id) {
    this.deleteSub = this.postsService.deletePost(id).subscribe(
      () => { window.location.reload(); },
      (error) => console.log(error.statusText)
    );
  }

  savePost(ev, i, postId) {
    const modifiedPost = this.helper.getPostData(i);
    this.saveSub = this.postsService.modifyPost(postId, modifiedPost).subscribe(
      () => { window.location.reload(); },
      (error) => console.log(error.statusText)
    );
    this.helper.makePostUnwritable(ev, i);
  }

  showDetails(id) {
    this.router.navigate([`backoffice/app/${id}`]);
  }

  cancelPostChanges(ev, indexItem) {
    this.helper.cancelPostChanges(ev, indexItem);
  }

  ngOnDestroy() {
    if (this.deleteSub) { this.deleteSub.unsubscribe(); }
    if (this.createPosstSub) { this.createPosstSub.unsubscribe(); }
    if (this.saveSub) { this.saveSub.unsubscribe(); }
  }

}
