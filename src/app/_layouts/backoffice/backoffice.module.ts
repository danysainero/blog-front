import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AppLoginComponent } from 'src/app/shared/backoffice-login/app-login.component';
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';
import { PostPrivateDetailComponent } from 'src/app/shared/post-private-detail/post-private-detail.component';
import { GuardsService } from 'src/app/_services/bussiness/guards-service.service';
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
    ErrorMessageComponent,
    PostPrivateComponent],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ToggleButtonModule,
     RouterModule.forChild(ROUTES)
  ],
  exports: [
    AppLoginComponent,
    PostPrivateComponent,
    PostPrivateDetailComponent,
    BackofficeDefaultComponent,
    RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BackofficeModule { }
