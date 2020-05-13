import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from 'src/app/app-login/app-login.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';

const ROUTES: Routes = [
  {
    path: 'login',
    component: SimpleLayoutComponent,
    children: [
      {
          path: '',
          component: AppLoginComponent
      }
  ]
  }
];

@NgModule({
  declarations: [SimpleLayoutComponent,
    AppLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [SimpleLayoutComponent,
    AppLoginComponent,
    RouterModule]
})
export class SimpleModule { }
