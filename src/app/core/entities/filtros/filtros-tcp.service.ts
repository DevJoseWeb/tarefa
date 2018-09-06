import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";
import { environment } from "~src/environments/environment";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { ITransacaoTituloInput, ITransacaoTituloOutput } from "~src/app/core/models/TransacaoTitulo";
import { ITransacaoContasReceber } from "~src/app/core/models/TransacaoContasReceber";
import { IListarFornecedorOutput, IListarFornecedorInput, IRecFornecedor } from "~src/app/core/models/Fornecedor";

const TCP_SERVICE = `${environment.project.domain}/tcp_baixa`;

@Injectable()
export class FiltrosServicesTCP {

    constructor(private http: HttpClient, private messageService: MessageService) {}

    public obterFornecedores(params: IListarFornecedorInput): Observable<IListarFornecedorOutput> {
        return this.http.post(`${TCP_SERVICE}/queries/listarFornecedor`, params)
            .pipe(
                map((fornecedores: any) => {
                    fornecedores.fornecedores = fornecedores.fornecedores.map((fornecedor: IRecFornecedor) => {
                        fornecedor.label = `${fornecedor.idFornecedor} - ${fornecedor.nome}`;
                        fornecedor.value = fornecedor.idFornecedor;
                        return fornecedor;
                    });
                    return fornecedores;
                })
            );
    }

    public listarTransacoesTitulo(params: ITransacaoTituloInput): Observable<ITransacaoTituloOutput> {
        return this.http.post(`${TCP_SERVICE}/queries/listarTransacao`, params)
            .pipe(
                map((transacoes: any) => {
                    transacoes.transacoes = transacoes.transacoes.map((transacao: ITransacaoContasReceber) => {
                        transacao.label = `${transacao.transacao} - ${transacao.descricao}`;
                        transacao.value = transacao.id;
                        return transacao;
                    });
                    return transacoes;
                })
            );
    }
}
