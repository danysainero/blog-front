
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_data/post';
import { User } from 'src/app/_data/user';
import { PostsStoreService } from 'src/app/_services/bussiness/posts.store';
import { UsersStoreService } from 'src/app/_services/bussiness/users.store';

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
  user$: User[];
  randomPic = ['pic-1.png', 'pic-3.png', 'pic-4.webp', 'pic-2.png' , 'pic-5.png', 'pic-3.png', 'pic-4.webp', 'pic-5.png', 'pic-4.webp', 'pic-2.png' , 'pic-5.png', 'pic-3.png'];
  
  constructor(
    private router: Router,
    private usersStore: UsersStoreService,
    private store: PostsStoreService
  ) { }

  ngOnInit(): void {
    this.store.init();
    this.posts$ = this.store.get$();
    this.usersStore.get$().subscribe(res => this.user$ = res);

    this.initializeForms();
    
    this.boxDisplay = this.posts$.subscribe(res => res?.map(s => true));
  }

  showDialog(id) {
    this.postToDelete = id;
    this.display = !this.display;
  }

  createPost() {
    this.store.createPost$(this.newPostForm.value);
    this.displayNewPostForm = !this.displayNewPostForm;
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
    const postContent = this.UpdatePostForm.get('postContent').value || post.postContent;
    const postTitle = this.UpdatePostForm.get('postTitle').value || post.postTitle;

    if (postContent !== '' && postContent !== null) {
      post.postContent = postContent;
    }
    if (postTitle !== '' && postTitle !== null) {
      post.postTitle = postTitle;
    }
    if ((postContent !== '' && postContent !== null) || (postTitle !== '' && postTitle !== null)) {
      this.store.modifyPost$(post.postId, post);

    }
    this.boxDisplay[i] = !this.boxDisplay[i];
    this.UpdatePostForm.reset();
  }

  showDetails(id, index) {
    this.router.navigate([`backoffice/app/${id}`], {queryParams: {i: index}});
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
