import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  url: string = `${environment.SoftApi}/Statistics/Position`;
  constructor(private httpCliente: HttpClient) { }
  Get(id?: number): Observable<any> {
    return this.httpCliente.get<any>(id != null ? this.url + "?id=" + id : this.url, {});
  }
}
