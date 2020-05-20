import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Helper {

    title: string;
    content: string;

constructor(){}

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

      getPostData(indexItem) {
        const titleEditable: HTMLElement = document.querySelector(`#post${indexItem} .card__title`) as HTMLElement;
        const textEditable: HTMLElement = document.querySelector(`#post${indexItem} .card__text`) as HTMLElement;
        const postTitle = titleEditable.innerHTML;
        const postContent = textEditable.innerHTML;
        return { postTitle, postContent };
      }
}
