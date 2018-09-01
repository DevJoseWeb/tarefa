import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "~src/environments/environment";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

const URL = `${environment.project.domain}/${environment.project.service}`;

@Injectable()
export class OperacoesBaixasService {

    constructor(protected http: HttpClient) { }

    public listarTransacaoTesouraria(params: any): Observable<any> {
        return this.http.post(`${URL}/queries/listarTransacaoTesouraria`, params)
            .pipe(
                map((transacoesTesouraria: any) => {
                    transacoesTesouraria.transacoesTesouraria = transacoesTesouraria.transacoesTesouraria.map((transacaoTesouraria: any) => {
                        transacaoTesouraria.label = `${transacaoTesouraria.id} - ${transacaoTesouraria.descricao}`;
                        transacaoTesouraria.value = transacaoTesouraria.id;
                        return transacaoTesouraria;
                    });
                    return transacoesTesouraria;
                })
            );
    }

    public listarContaInternaAtiva(params: any) {
        return this.http.post(`${URL}/queries/listarContaInternaAtiva`, params)
            .pipe(
                map((contasInternas: any) => {
                    contasInternas.contasInternas = contasInternas.contasInternas.map((contaInterna: any) => {
                        contaInterna.label = `${contaInterna.id} - ${contaInterna.descricao}`;
                        contaInterna.value = contaInterna.id;
                        return contaInterna;
                    });
                    return contasInternas;
                })
            );
    }
}
