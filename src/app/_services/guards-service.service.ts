import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(childRoute: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No estás logueado');
      this.router.navigate(['backoffice/login']);
      return false;
    }
    console.log(' estás logueado');
    return true;
  }

}
