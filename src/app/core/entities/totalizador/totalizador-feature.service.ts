import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "~src/environments/environment";
import { IRecFiltroTituloReceberInput } from '~src/app/core/models/TituloReceber';
import { ICalcularTotalInput } from '~src/app/core/models/CalcularTotal';

const URL = `${environment.project.domain}/${environment.project.service}`;
const URL_TCP = `${environment.project.domain}/tcp_baixa`;

@Injectable()
export class TotalizadorFeatureService {
  
  constructor(private http: HttpClient) { }

  public calcularTotalBaixar(params: ICalcularTotalInput): Observable<any> {
    return this.http.post(`${URL}/actions/calcularTotalBaixar`, params)
  }

  public calcularTotalAproveitar(params: ICalcularTotalInput): Observable<any> {
    return this.http.post(`${URL}/actions/calcularTotalCredito`, params)
  }

  public calcularTotalCompensar(params: ICalcularTotalInput): Observable<any> {
    return this.http.post(`${URL_TCP}/actions/calcularTotalCompensar`, params)
  }
}
