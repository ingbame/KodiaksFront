import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RivalTeamEntity } from '../models/rival-team';

@Injectable({
  providedIn: 'root'
})
export class RivalTeamService {
  url: string = `${environment.SoftApi}/Statistics/RivalTeam`;
  constructor(private httpCliente: HttpClient) { }
  Get(id?:number): Observable<any>{
    let urlGet = this.url;
    if(id != null){
      urlGet += "?id=" + id;
    }
    return this.httpCliente.get<any>(urlGet, {});
  }
  Post(model: RivalTeamEntity): Observable<any> {
    return this.httpCliente.post<any>(this.url, model);
  }
  Put(id:number, model: RivalTeamEntity): Observable<any> {
    let urlPut = `${this.url}?id=${id}`;
    return this.httpCliente.put<any>(urlPut, model);
  }
  Delete(model: any): Observable<any> {
    return this.httpCliente.delete<any>(this.url, model);
  }
}
