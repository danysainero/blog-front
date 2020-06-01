import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_data/post';
import { PostsService } from 'src/app/_services/bussiness/posts.service';
import { PostsStoreService } from 'src/app/_services/bussiness/posts.store';
import { Helper } from './../../helpers/helper';

@Component({
  selector: 'app-post-private',
  templateUrl: './post-private.component.html',
  styleUrls: ['./post-private.component.scss'
  ]
})
export class PostPrivateComponent implements OnInit {

  newPostForm: FormGroup;
  UpdatePostForm: FormGroup;
  displayNewPostForm = false;
  posts$: Observable<Post[]>;

  constructor(
    private router: Router,
    private postsService: PostsService,
    private store: PostsStoreService,
    private helper: Helper,
   ) { }

  ngOnInit(): void {
    this.store.init();
    this.posts$ = this.store.get$();

    this.initializeForms();
  }

  createPost() {
    this.store.createPost$(this.newPostForm.value);
  }

  deletePost(id) {
    this.store.deletePost$(id);
  }

  modifyPost(postId, post) {

    const postContent = this.UpdatePostForm.get('postContent').value.trim();
    const postTitle = this.UpdatePostForm.get('postTitle').value.trim();

    if (postContent !== '') {
      post.postContent = postContent;
    }
    if (postTitle !== '') {
      post.postTitle = postTitle;
    }
    if (postContent !== '' || postTitle !== '') {
      this.store.modifyPost$(postId, post);
    }

  }

logger(){
  alert('eeee');
}
  showDetails(id) {
    this.router.navigate([`backoffice/app/${id}`]);
  }


  initializeForms() {
    this.newPostForm = new FormGroup({
      postAuthorName: new FormControl('', [Validators.required]),
      postAuthorNickName: new FormControl('', [Validators.required]),
      postTitle: new FormControl('', [Validators.required]),
      postContent: new FormControl('', [Validators.required])
    });

    this.UpdatePostForm = new FormGroup({
      postTitle: new FormControl('', [Validators.required]),
      postContent: new FormControl('', [Validators.required])
    });
  }
}
