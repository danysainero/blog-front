import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';

const ROUTES: Routes = [
  {
    path: '', component: AppLayoutComponent
  }
];

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
