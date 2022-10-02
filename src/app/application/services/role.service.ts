import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  urlRole: string = `${environment.kodiaksApi}/Application/Role`;

  constructor(private httpCliente: HttpClient) { }

  GetRole(id?: number): Observable<any> {
    return this.httpCliente.get<any>(id != null ? this.urlRole + "?id=" + id : this.urlRole, {});
  }
}
