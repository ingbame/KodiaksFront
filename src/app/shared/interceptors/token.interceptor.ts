import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('authUser') && localStorage.getItem('authUser') != '') {
      let authUser = JSON.parse(localStorage.getItem('authUser')!!);

      let newRequest = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + authUser.token)
      });

      return next.handle(newRequest);
    } else if (this.authService.user.trim() != "" && this.authService.pass.trim() != "") {
      let newRequest = request.clone({
        headers: request.headers.append('Authorization', 'Basic ' + window.btoa(this.authService.user.trim() + ":" + this.authService.pass.trim()))
      });

      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
