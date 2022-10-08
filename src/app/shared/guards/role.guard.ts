import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/auth/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.isAuthorized(route)){
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }

  private isAuthorized(route: ActivatedRouteSnapshot): boolean{
    const expectedRoles = route.data?.['expectedRoles'] ?? [];
    const roleMatches = this.session.getLocalRoles().filter(r => expectedRoles.indexOf(r) !== -1);
    const userRoleMatches = roleMatches.findIndex(r => r === this.session.role);
    return userRoleMatches < 0 ? false : true;
  }
}
