import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/backoffice/login') || req.url.includes('/home')) {
      const token: string = localStorage.getItem('token');
      if (token) {
        const reqAuth = req.clone(
          { headers: req.headers.set('Authorization', 'Bearer ' + token) }
        );
        return next.handle(reqAuth);
      }
    }
    return next.handle(req);
  }
}

