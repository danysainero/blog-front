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
  @Input() posts: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showPost(id) {
  // ir a getpostbyid
  this.router.navigate( [`home/${id}`]);
  }
}
