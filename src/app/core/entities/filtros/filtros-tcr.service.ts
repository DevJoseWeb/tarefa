import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";
import { environment } from "~src/environments/environment";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { IObterClienteInput, IObterClienteOutput, IRecCliente } from "~src/app/core/models/Cliente";
import { IPesquisarFilialInput, IRecFilial, IPesquisarFilialOutput } from "~src/app/core/models/Filial";
import { IObterFormaPagamentoInput, IObterFormaPagamentoOutput, RecFormaPagamento } from "~src/app/core/models/FormaPagamento";

const TCR_SERVICE = `${environment.project.domain}/tcr_tituloreceber`;

@Injectable()
export class FiltrosServicesTCR {

    constructor(private http: HttpClient, private messageService: MessageService) {}

    public obterFilial(params: IPesquisarFilialInput): Observable<IPesquisarFilialOutput> {
        return this.http.post(`${TCR_SERVICE}/queries/pesquisarFilial`, params)
            .pipe(
                map((filiais: any) => {
                    filiais.filiais = filiais.filiais.map((filial: IRecFilial) => {
                        filial.label = `${filial.codigo} - ${filial.nome}`;
                        filial.value = filial.id;
                        return filial;
                    })
                    return filiais;
                })
            );
    }

    public obterClientes(params: IObterClienteInput): Observable<IObterClienteOutput> {
        return this.http.post(`${TCR_SERVICE}/queries/obterClientes`, params)
            .pipe(
                map((clientes: any) => {
                    clientes.clientes = clientes.clientes.map((cliente: IRecCliente) => {
                        cliente.label = `${cliente.id} - ${cliente.nome}`;
                        return cliente;
                    });
                    return clientes;
                })
            );
    }

    public obterFormasPagamento(params: IObterFormaPagamentoInput): Observable<IObterFormaPagamentoOutput> {
        return this.http.post(`${TCR_SERVICE}/queries/obterFormasPagamento`, params)
            .pipe(
                map((formasPagamento: any) => {
                    formasPagamento.formasPagamento = formasPagamento.formasPagamento.map((formaPagamento: RecFormaPagamento) => {
                        formaPagamento.label = `${formaPagamento.codigo} - ${formaPagamento.descricao}`;
                        formaPagamento.value = formaPagamento.id;
                        return formaPagamento;
                    });
                    return formasPagamento;
                })
            )
    }

    public verificarVencimentoUtil(params: any) {
        return this.http.post(`${TCR_SERVICE}/queries/verificarVencimentoUtil`, params)
            .pipe(
                map((datas: any) => datas.vencimentoUtil)
            );
    }

}
