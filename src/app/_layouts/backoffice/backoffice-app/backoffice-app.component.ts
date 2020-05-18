
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { PostDTO } from 'src/app/_dtos/post-dto';
import { PostsProxyService } from 'src/app/_services/posts-proxy.service';

@Component({
  selector: 'app-backoffice-app',
  templateUrl: './backoffice-app.component.html',
  styleUrls: ['./backoffice-app.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s linear',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.5s linear',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class BackofficeAppComponent implements OnInit {

  constructor(private postsProxyService: PostsProxyService) { }

  newPostForm: FormGroup;
  displayNewPostForm: boolean;
  posts$: Observable<PostDTO>;
  createPosstSub: Subscription;

  ngOnInit(): void {
    this.displayNewPostForm = false;
    this.posts$ = this.postsProxyService.getAllPost();
    this.newPostForm = new FormGroup({
      postAuthorName: new FormControl('', [Validators.required]),
      postAuthorNickName: new FormControl('', [Validators.required]),
      postTitle: new FormControl('', [Validators.required]),
      postContent: new FormControl('', [Validators.required])
    });
  }


   createPost() {
    this.createPosstSub = this.postsProxyService.createPost(this.newPostForm.value).subscribe();
    this.displayNewPostForm = !this.displayNewPostForm;
  }


  showNewPostForm() {
    this.displayNewPostForm = !this.displayNewPostForm;
  }


 /*  ngOnDestroy(){
    this.createPosstSub.unsubscribe();
  } */
}
