
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_data/post';
import { PostsStoreService } from 'src/app/_services/bussiness/posts.store';

@Component({
  selector: 'app-post-private',
  templateUrl: './post-private.component.html',
  styleUrls: ['./post-private.component.scss'],

})
export class PostPrivateComponent implements OnInit {

  newPostForm: FormGroup;
  UpdatePostForm: FormGroup;
  displayNewPostForm = false;
  posts$: Observable<Post[]>;
  fields: any[];
  id: string;
  checked = false;
  boxDisplay;
  display = false;
  postToDelete: string;

  constructor(
    private router: Router,
    private store: PostsStoreService
  ) { }

  ngOnInit(): void {
    this.store.init();
    this.posts$ = this.store.get$();
    this.initializeForms();
    this.fields = [
      { field: 'postId', title: 'postId' },
      { field: 'postAuthorName', title: 'Username' },
      { field: 'postAuthorNickName', title: 'Nickname' },
      { field: 'postTitle', title: 'Title' },
      { field: 'postContent', title: 'postContent' },
    ];

    this.boxDisplay = this.posts$.subscribe(res => res?.map(s => true));
  }

  showDialog(id) {
    this.postToDelete = id;
    this.display = !this.display;
  }

  createPost() {
    this.store.createPost$(this.newPostForm.value);
  }

  deletePost(id) {
    
    if (!id) {
      this.store.deletePost$(this.postToDelete);
    } else {
      this.store.deletePost$(id);
    }

    this.display = !this.display;
  }

  modifyPost(i) {
    this.boxDisplay[i] = !this.boxDisplay[i];
  }

  savePost(post, i) {
    const postContent = this.UpdatePostForm.get('postContent').value;
    const postTitle = this.UpdatePostForm.get('postTitle').value;

    if (postContent !== '' && postContent !== null) {
      post.postContent = postContent;
    }
    if (postTitle !== '' && postTitle !== null) {
      post.postTitle = postTitle;
    }
    if ((postContent !== '' && postContent !== null) || (postTitle !== '' && postTitle !== null)) {
      this.store.modifyPost$(post.postId, post);
      this.UpdatePostForm.reset();
    }

    this.boxDisplay[i] = !this.boxDisplay[i];
  }

  showDetails(id) {
    this.router.navigate([`backoffice/app/${id}`]);
  }

  initializeForms() {
    this.newPostForm = new FormGroup({
      postTitle: new FormControl('', [Validators.required]),
      postContent: new FormControl('', [Validators.required])
    });

    this.UpdatePostForm = new FormGroup({
      postTitle: new FormControl('', [Validators.required]),
      postContent: new FormControl('', [Validators.required])
    });
  }
}
