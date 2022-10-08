import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from "./shared/interceptors/token.interceptor";
import { ToastrModule } from 'ngx-toastr';
import { RoleDirective } from './shared/directives/role.directive';
import { SessionInterceptor } from "./shared/interceptors/session.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    RoleDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
