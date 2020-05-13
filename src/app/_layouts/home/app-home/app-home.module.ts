import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
          }
      ]
  }
];

@NgModule({
  declarations: [AppHomeComponent, HomeDefaultComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    HomeDefaultComponent,
    AppHomeComponent,
    RouterModule
  ]
})
export class AppHomeModule { }
