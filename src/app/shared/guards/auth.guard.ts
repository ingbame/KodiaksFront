import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private activedRoute: ActivatedRoute) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('authUser') && localStorage.getItem('authUser') != '') {
      let authUser = JSON.parse(localStorage.getItem('authUser')!!);
      let decoded: any = jwt_decode(authUser.token);
      const expireDate = (decoded.exp * 1000);
      if (expireDate < Date.now()){
        localStorage.removeItem('authUser');
        this.ExcecuteNavigate(state.url);
        return false;
      }
      return true;
    } else
      this.ExcecuteNavigate(state.url);

    return false;
  }

  ExcecuteNavigate(url: string): void {
    if (url == '' || url == '/') {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['login', { url: url }]);
    }
  }
}
