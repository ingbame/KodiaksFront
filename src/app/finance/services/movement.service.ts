import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stringToAlpha } from 'tsparticles-engine';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  url: string = `${environment.SoftApi}/Finance/Movement`;
  constructor(private httpCliente: HttpClient) { }
  Get(id?: number, year?: number, month?: number): Observable<any> {
    let params: string = "";
    if (id)
      params += `id=${id}`;
    if (year)
      if (params.length <= 0)
        params += `year=${year}`;
      else
        params += `&year=${year}`
    if (month)
      if (params.length <= 0)
        params += `month=${month}`;
      else
        params += `&month=${month}`
    return this.httpCliente.get<any>(params.length > 0 ? `${ this.url }?${ params }` : this.url, {});
  }
  GetYearMonth(year?: number, month?: number): Observable<any> {
    let params: string = "";
    if (year)
      if (params.length <= 0)
        params += `year=${year}`;
      else
        params += `&year=${year}`
    if (month)
      if (params.length <= 0)
        params += `month=${month}`;
      else
        params += `&month=${month}`
    return this.httpCliente.get<any>(params.length > 0 ? `${this.url}/GetByYearMonth?${ params }` : `${this.url}/GetByYearMonth`, {});
  }
  GetTotal(): Observable<any> {
    return this.httpCliente.get<any>(this.url + "/Total", {});
  }
  post(model: any): Observable<any> {
    return this.httpCliente.post<any>(this.url, model);
  }
}
