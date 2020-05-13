import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppHomeModule } from './_layouts/home/app-home/app-home.module';
import { SimpleLayoutComponent } from './_layouts/simple/simple-layout/simple-layout.component';
import { SimpleModule } from './_layouts/simple/simple.module';


const ROUTES: Routes =  [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: SimpleLayoutComponent},
  {path: 'home', loadChildren:
  () => import('../app/_layouts/home/app-home/app-home-component/app-home-component.component')
  .then(m => m.AppHomeComponent)},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppHomeModule,
    SimpleModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
