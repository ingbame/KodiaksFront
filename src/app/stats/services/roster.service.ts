import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  constructor(private httpCliente: HttpClient) { }
  GetRoster(): Observable<any>{
    let url = `${environment.kodiaksApi}/Statistics/Roster`;
    return this.httpCliente.get<any>(url, {});
  }
}
