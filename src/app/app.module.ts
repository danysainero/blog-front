import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BackofficeDefaultComponent } from './_layouts/backoffice/backoffice-default/backoffice-default.component';
import { SimpleModule } from './_layouts/backoffice/backoffice.module';
import { AppHomeComponent } from './_layouts/home/app-home/app-home-component/app-home-component.component';
import { AppHomeModule } from './_layouts/home/app-home/app-home.module';


const ROUTES: Routes =  [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: AppHomeComponent},
  {path: 'backoffice', component: BackofficeDefaultComponent},
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
    SimpleModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
