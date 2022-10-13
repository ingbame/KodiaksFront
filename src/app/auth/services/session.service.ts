import { Injectable } from '@angular/core';

import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _token: string = "";
  private _nameIdentifier: string = "";
  private _name: string = "";
  private _givenName: string = "";
  private _role: string = "";
  private _canEdit: boolean = false;
  private _expires?: number;

  constructor() { }

  get token() {
    const session = this.getLocalSession();
    this._token = session?.token ?? "";
    return this._token;
  }
  set token(value: string) {
    this.refreshToken(value);
    this._token = value;
  }
  get nameIdentifier() {
    const session = this.getLocalSession();
    this._nameIdentifier = session?.nameIdentifier ?? "";
    return this._nameIdentifier;
  }
  get name() {
    const session = this.getLocalSession();
    this._name = session?.name ?? "";
    return this._name;
  }
  get givenName() {
    const session = this.getLocalSession();
    this._givenName = session?.givenName ?? "";
    return this._givenName;
  }
  get role() {
    const session = this.getLocalSession();
    this._role = session?.role ?? "";
    return this._role;
  }
  get canEdit() {
    const session = this.getLocalSession();
    this._canEdit = session?.canEdit ?? false;
    return this._canEdit;
  }
  get expires() {
    const session = this.getLocalSession();
    this._expires = session?.expires ?? -1;
    return this._expires;
  }

  getLocalRoles(): string[]{
    const roles = ["SuperAdmin","Admin","User"];
    return roles;
  }

  private getLocalSession(): any {
    let session = undefined;
    try {
      if (localStorage.getItem('authUser') && localStorage.getItem('authUser') != '') {
        const authUser = JSON.parse(localStorage.getItem('authUser')!!);
        const decoded: any = jwt_decode(authUser);
        const expireDate = (decoded.exp * 1000);

        if (expireDate < Date.now()) {
          localStorage.removeItem('authUser');
          return session;
        }

        let userData = JSON.parse(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']);

        session = {
          token: authUser,
          nameIdentifier: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
          name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          givenName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
          role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
          canEdit: userData.CanEdit,
          expires: expireDate
        };
      } else {
        if (localStorage.getItem('authUser'))
          localStorage.removeItem('authUser');
      }
      return session;
    } catch (error) {
      return session;
    }
  }
  private refreshToken(token: string): void {
    if (token != "")
      localStorage.setItem('authUser', JSON.stringify(token));
    else
      localStorage.removeItem('authUser');

  }
}
