import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  showElement: number;
  index: number;

  @Input() posts: [];

  constructor(private router: Router) { }

  ngOnInit(): void {}

  showPost(id) {
  this.router.navigate( [`home/${id}`]);
  }
}
