import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from 'src/app/shared/post-detail/post-detail.component';
import { PostComponent } from 'src/app/shared/post/post.component';
import { HomeDefaultComponent } from '../home-default/home-default.component';
import { AppHomeComponent } from './app-home-component/app-home-component.component';

const ROUTES: Routes = [
  {
    path: 'home',
    component: AppHomeComponent,
    children: [
      {
        path: '',
        component: HomeDefaultComponent
      },
      {
        path: ':id',
        component: PostDetailComponent
      },
    ]
  }
];

@NgModule({
  declarations: [AppHomeComponent, HomeDefaultComponent, PostComponent, PostDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    HomeDefaultComponent,
    AppHomeComponent,
    PostComponent,
    PostDetailComponent
  ]
})
export class AppHomeModule { }
