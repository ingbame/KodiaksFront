import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private httpCliente: HttpClient) { }
  GetMenu(): Observable<any> {
    let url = `${environment.kodiaksApi}/Application/Menu`;
    return this.httpCliente.get<any>(url, {});
  }
}
