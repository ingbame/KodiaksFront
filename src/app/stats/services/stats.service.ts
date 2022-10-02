import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private httpCliente: HttpClient) { }
  GetBattingThrowingSides(id?:number): Observable<any>{
    let url = `${environment.kodiaksApi}/Statistics/BattingThrowingSides`;
    if(id != null){
      url += "?id=" + id;
    }
    return this.httpCliente.get<any>(url, {});
  }
}
