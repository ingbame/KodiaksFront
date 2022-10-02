import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  url: string = `${environment.kodiaksApi}/Finance/Movement`;
  constructor(private httpCliente: HttpClient) { }
  Get(id?: number): Observable<any> {
    return this.httpCliente.get<any>(id != null ? this.url + "?id=" + id : this.url, {});
  }
  GetTotal(): Observable<any> {
    return this.httpCliente.get<any>(this.url + "/Total", {});
  }
  post(model: any): Observable<any> {
    return this.httpCliente.post<any>(this.url, model);
  }
}
