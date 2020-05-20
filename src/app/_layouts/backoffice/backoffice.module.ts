import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { PostPrivateDetailComponent } from 'src/app/shared/post-private-detail/post-private-detail.component';
import { AppLoginComponent } from 'src/app/_layouts/backoffice/backoffice-login/app-login.component';
import { GuardsService } from 'src/app/_services/guards-service.service';
import { PostPrivateComponent } from './../../shared/post-private/post-private.component';
import { BackofficeDefaultComponent } from './backoffice-default/backoffice-default.component';

const ROUTES: Routes = [
  {
    path: 'backoffice',
    component: BackofficeDefaultComponent,
    children: [
      {
        path: 'app',
        component: PostPrivateComponent, canActivate: [GuardsService]
      },
      {
        path: 'app/:id',
        component: PostPrivateDetailComponent, canActivate: [GuardsService]
      }, {
        path: 'login',
        component: AppLoginComponent
      },
    ]
  }


];

@NgModule({
  declarations: [
    AppLoginComponent,
    BackofficeDefaultComponent,
    PostPrivateDetailComponent,
    PostPrivateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    AppLoginComponent,
    PostPrivateComponent,
    PostPrivateDetailComponent,
    BackofficeDefaultComponent,
    RouterModule]
})
export class BackofficeModule { }
