import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  url: string = `${environment.kodiaksApi}/Statistics/Roster`;
  constructor(private httpCliente: HttpClient) { }
  Get(): Observable<any>{
    return this.httpCliente.get<any>(this.url, {});
  }
  Post(model: any): Observable<any> {
    return this.httpCliente.post<any>(this.url, model);
  }
  Delete(model: any): Observable<any> {
    return this.httpCliente.delete<any>(this.url, model);
  }
}
