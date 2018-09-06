import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, debounceTime } from 'rxjs/operators';

@Injectable()
export class TotalDividaFeatureService {
  private API_URL = `${$project.domain}/${$project.service}/`;
  constructor(private http: HttpClient) { }

  public listarGrupoEmpresa(data: any): Observable<any> {
    const url = `${this.API_URL}queries/listarGrupoEmpresa`;
    return this.http.post<any>(url, data).pipe(
      map((response: any) => ({
        transacoesGrupoEmpresa: response.transacoes.map((transacao: any) => ({
          label: `${transacao.transacao} - ${transacao.descricao}`,
          value: transacao.id
        }))
      }))
    );
  }

  public obterClientesPorGrupo(data: any): Observable<any> {
    const url = `${this.API_URL}queries/obterClientesPorGrupo`;
    return this.http.post<any>(url, data).pipe(
      map((response: any) => ({
        transacoesClientesPorGrupo: response.transacoes.map((transacao: any) => ({
          label: `${transacao.transacao} - ${transacao.descricao}`,
          value: transacao.id
        }))
      }))
    );
  }

  public calcularTotalBaixar(data: any): Observable<any> {
    const url = `${this.API_URL}queries/calcularTotalBaixar`;
    return this.http.post<any>(url, data).pipe(
      map((reponse: any) => ({
        transacoesCalcularTotalBaixar: reponse.transacoes.map((transacao: any) => ({
          label: `${transacao.transacao} - ${transacao.descricao}`,
          value: transacao.id
        }))
      }))
    );
  }

  public calcularTotalCredito(data: any): Observable<any> {
    const url = `${this.API_URL}queries/calcularTotalCredito`;
    return this.http.post<any>(url, data).pipe(
      map((response: any) => ({
        transacoeCalcularTotalCredito: response.transacao.map((transacao: any) => ({
          label: `${transacao.transacao} - ${transacao.descricao}`,
          value: transacao.id
        }))
      }))
    );
  }

  public calcularTotalCompensar(data: any): Observable<any> {
    const url = `${this.API_URL}queries/calcularTotalCompensar`;
    return this.http.post<any>(url, data).pipe(
      map((reponse: any) => ({
        transacaoCalcularTotalCompensar: reponse.transacao.map((transacao: any) => ({
          label: `${transacao.transacao} - ${transacao.descricao}`,
          value: transacao.id
        }))
      }))
    );
  }
}
