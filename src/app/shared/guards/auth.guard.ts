import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/auth/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private sessionService: SessionService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.sessionService.token != "") {
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
