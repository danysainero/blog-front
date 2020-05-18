import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BackofficeModule } from './_layouts/backoffice/backoffice.module';
import { AppHomeComponent } from './_layouts/home/app-home/app-home-component/app-home-component.component';
import { AppHomeModule } from './_layouts/home/app-home/app-home.module';
import { AuthInterceptorService } from './_services/auth-interceptor.service';


const ROUTES: Routes =  [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: AppHomeComponent},
  {path: 'backoffice', loadChildren: () => import('./_layouts/backoffice/backoffice.module').then(m => m.BackofficeModule)},
  {path: '**', redirectTo: 'home'}
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppHomeModule,
    HttpClientModule,
    BackofficeModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
