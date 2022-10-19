import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SessionService } from 'src/app/auth/services/session.service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest = request;
    let update: any = {};
    if (this.authService.user.trim() != "" && this.authService.pass.trim() != "" && !this.authService.changePswd) {
      update = {
        setHeaders: {
          authorization: `Basic ${window.btoa(this.authService.user.trim() + ":" + this.authService.pass.trim())}`
        }
      };
      newRequest = request.clone(update);
      this.authService.user = "";
      this.authService.pass = "";
    }

    return next.handle(newRequest);
  }
}
