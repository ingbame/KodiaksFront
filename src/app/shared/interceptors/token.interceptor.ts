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
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private sessionService: SessionService,
    private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest = request;
    let update: any = {};

    if (this.sessionService.token != "") {
      if (this.authService.user.trim() != "" && this.authService.pass.trim() != "" && this.authService.changePswd) {
      update = {
        setHeaders: {
          authorization: `Bearer ${this.sessionService.token}`,
          ChangePaswordAuth: `Basic ${window.btoa(this.authService.user.trim() + ":" + this.authService.pass.trim())}`
        }
      };
      this.authService.user = "";
      this.authService.pass = "";
    }else{
      update = {
        setHeaders: {
          authorization: `Bearer ${this.sessionService.token}`
        }
      };
    }
      newRequest = request.clone(update);
    }
    return next.handle(newRequest);
  }
}
