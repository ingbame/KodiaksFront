import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  urlMember: string = `${environment.kodiaksApi}/Application/Member`;
  constructor(private httpCliente: HttpClient) { }
  GetMember(id?: number): Observable<any> {
    return this.httpCliente.get<any>(id != null ? this.urlMember + "?id=" + id : this.urlMember, {});
  }
  AddMember(model: any): Observable<any> {
    return this.httpCliente.post<any>(this.urlMember, model);
  }
  UpdateMember(id?: number, model?: any): Observable<any> {
    return this.httpCliente.put<any>(id != null ? this.urlMember + "?id=" + id : this.urlMember, model);
  }
}
