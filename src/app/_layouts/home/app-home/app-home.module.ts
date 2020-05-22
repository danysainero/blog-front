import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from 'src/app/shared/post-detail/post-detail.component';
import { PostComponent } from 'src/app/shared/post/post.component';
import { AppLayoutComponent } from '../../app-layout/app-layout.component';
import { AppHomeComponent } from './app-home-component/app-home-component.component';

const ROUTES: Routes = [
  {
    path: 'home',
    component: AppHomeComponent,
     children: [
      {
        path: '',
        component: PostComponent
      },
      {
        path: ':id',
        component: PostDetailComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    AppHomeComponent,
    PostComponent,
    PostDetailComponent,
    AppLayoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    AppHomeComponent,
    PostDetailComponent,
    PostComponent,
    AppLayoutComponent
  ]
})
export class AppHomeModule { }
