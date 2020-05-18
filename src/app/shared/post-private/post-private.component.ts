import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsProxyService } from './../../_services/posts-proxy.service';

@Component({
  selector: 'app-post-private',
  templateUrl: './post-private.component.html',
  styleUrls: ['./post-private.component.scss']
})
export class PostPrivateComponent implements OnInit {

  modifyPostSub: Subscription;
  title: string;
  content: string;

  @Input() posts: any;
  constructor(
    private postsProxyService: PostsProxyService,
    private router: Router) { }

  ngOnInit(): void {}

  SavePost(ev, i, postId) {
    const modifiedPost = this.getPostData(i);
    this.modifyPostSub = this.postsProxyService.modifyPost(postId, modifiedPost).subscribe();
    this.makePostUnwritable(ev, i);
  }

  modifyPost(ev, indexItem) {
    this.makePostWritable(indexItem, ev);
  }

  deletePost(id) {
    this.postsProxyService.deletePost(id).subscribe();
  }

   showDetails(id){
    this.router.navigate( [`backoffice/app/${id}`]);
  }

  getPostData(indexItem) {
    const titleEditable: HTMLElement = document.querySelector(`#post${indexItem} .card__title`) as HTMLElement;
    const textEditable: HTMLElement = document.querySelector(`#post${indexItem} .card__text`) as HTMLElement;
    const postTitle = titleEditable.innerHTML;
    const postContent = textEditable.innerHTML;
    return { postTitle, postContent };
  }

  makePostUnwritable(ev, indexItem) {
    ev.target.style.display = 'none';
    ev.path[1].children[2].style.display = 'none';
    ev.path[1].children[0].style.display = 'inline-block';
    const titleEditable: HTMLElement = document.querySelector(`#post${indexItem} .card__title`) as HTMLElement;
    const textEditable: HTMLElement = document.querySelector(`#post${indexItem} .card__text`) as HTMLElement;
    titleEditable.setAttribute('contentEditable', 'false');
    titleEditable.style.color = '#484848';
    textEditable.setAttribute('contentEditable', 'false');
    textEditable.style.color = '#484848';
  }
  makePostWritable(indexItem, ev) {
    ev.target.style.display = 'none';
    ev.path[1].children[1].style.display = 'inline-block';
    ev.path[1].children[2].style.display = 'inline-block';
    const titleEditable: HTMLElement = document.querySelector(`#post${indexItem} .card__title`) as HTMLElement;
    const textEditable: HTMLElement = document.querySelector(`#post${indexItem} .card__text`) as HTMLElement;
    this.title = titleEditable.innerHTML;
    this.content = textEditable.innerHTML;
    titleEditable.setAttribute('contentEditable', 'true');
    titleEditable.style.color = 'blue';
    titleEditable.focus();
    textEditable.setAttribute('contentEditable', 'true');
    textEditable.style.color = 'blue';
    textEditable.focus();
  }
  cancelPostChanges(ev, indexItem) {
    ev.target.style.display = 'none';
    ev.path[1].children[1].style.display = 'none';
    ev.path[1].children[0].style.display = 'inline-block';
    const titleEditable: HTMLElement = document.querySelector(`#post${indexItem} .card__title`) as HTMLElement;
    const textEditable: HTMLElement = document.querySelector(`#post${indexItem} .card__text`) as HTMLElement;
    titleEditable.innerHTML = this.title;
    textEditable.innerHTML = this.content;
    titleEditable.setAttribute('contentEditable', 'false');
    titleEditable.style.color = '#484848';
    textEditable.setAttribute('contentEditable', 'false');
    textEditable.style.color = '#484848';
  }

}
