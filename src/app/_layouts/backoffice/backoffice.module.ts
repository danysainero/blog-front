import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from 'src/app/_layouts/backoffice/backoffice-login/app-login.component';
import { GuardsService } from 'src/app/_services/guards-service.service';
import { BackofficeAppComponent } from './backoffice-app/backoffice-app.component';
import { BackofficeDefaultComponent } from './backoffice-default/backoffice-default.component';

const ROUTES: Routes = [
  {
    path: 'backoffice',
    component: BackofficeDefaultComponent,
    children: [
      {
        path: 'app',
        component: BackofficeAppComponent, canActivate: [GuardsService]
      },
      {
        path: 'login',
        component: AppLoginComponent
      }
    ]
  }


];

@NgModule({
  declarations: [BackofficeAppComponent,
    AppLoginComponent,
    BackofficeDefaultComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [BackofficeAppComponent,
    AppLoginComponent,
    RouterModule]
})
export class SimpleModule { }
