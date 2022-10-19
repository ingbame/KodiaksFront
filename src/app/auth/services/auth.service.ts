import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: string = "";
  pass: string = "";
  changePswd: boolean = false;

  constructor(private httpCliente: HttpClient) { }
  login(userName?: string, password?: string): Observable<any> {
    this.changePswd = false;
    let url = `${environment.kodiaksApi}/Security/Session/LoginAuthentication`;
    this.user = userName ?? "";
    this.pass = password ?? "";

    return this.httpCliente.post<any>(url, {});
  }
  cangePassword(userName?: string, password?: string): Observable<any> {
    this.changePswd = true;
    let url = `${environment.kodiaksApi}/Security/Session/ChangePassword`;
    this.user = userName ?? "";
    this.pass = password ?? "";

    return this.httpCliente.post<any>(url, {});
  }
}
