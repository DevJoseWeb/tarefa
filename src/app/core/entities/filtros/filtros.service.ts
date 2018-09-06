import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";

import { environment } from "~src/environments/environment";
import { EntityService } from "~src/app/core/entities/entity-service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { IGruposEmpresas, IListarGrupoEmpresaOutput } from "~src/app/core/models/GrupoEmpresa";
import { IObterTipoTitulosOutput, IRecTipoTitulo, IObterTipoTituloInput } from "~src/app/core/models/ObterTipoTitulos";
import { IObterClientesPorGrupoInput, IObterClientesPorGrupoOutput, IRecCliente } from "~src/app/core/models/Cliente";
import { ITransacaoTituloOutput, ITransacaoTituloInput } from "~src/app/core/models/TransacaoTitulo";
import { ITransacaoContasReceber } from "~src/app/core/models/TransacaoContasReceber";

const URL = `${environment.project.domain}/${environment.project.service}`;

@Injectable()
export class FiltrosServices extends EntityService<any> {

    constructor(protected http: HttpClient, protected messageService: MessageService) {
        super(http, messageService, URL);
    }

    public listarGrupoEmpresa(): Observable<IListarGrupoEmpresaOutput> {
        return this.http.get(`${URL}/queries/listarGrupoEmpresa`)
        .pipe(
            map((gruposEmpresas: any) => {
                gruposEmpresas.gruposEmpresas.map((grupoEmpresa: IGruposEmpresas) => {
                    grupoEmpresa.label = `${grupoEmpresa.grupo} - ${grupoEmpresa.nomeGrupo}`;
                    grupoEmpresa.value = grupoEmpresa.id;
                    return grupoEmpresa;
                });
                return gruposEmpresas;
            })
        );
    }

    public obterClientes(params: IObterClientesPorGrupoInput): Observable<IObterClientesPorGrupoOutput[]> {
        return this.http.post(`${URL}/queries/obterClientesPorGrupo`, params)
            .pipe(
                map((clientes: any) => {
                    clientes.clientes = clientes.clientes.map((cliente: IRecCliente) => {
                        cliente.label = `${cliente.id} - ${cliente.nome}`;
                        cliente.value = cliente.id;
                        return cliente;
                    });
                    return clientes;
                })
            );
    }

    public listarTipoTitulos(params: IObterTipoTituloInput): Observable<IObterTipoTitulosOutput> {
        return this.http.post(`${URL}/queries/listarTipoTitulo`, params)
            .pipe(
                map((tiposTitulos: any) => {
                    tiposTitulos.tiposTitulos = tiposTitulos.tiposTitulos.map((tipoTitulo: IRecTipoTitulo) => {
                        tipoTitulo.label = `${tipoTitulo.id} - ${tipoTitulo.descricao}`;
                        tipoTitulo.value = tipoTitulo.id;
                        return tipoTitulo;
                    });
                    return tiposTitulos;
                })
            );
    }

    public listarTransacoesTitulo(params: ITransacaoTituloInput): Observable<ITransacaoTituloOutput> {
        return this.http.post(`${URL}/queries/listarTransacao`, params)
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

    public verificarDataBaixa(params: any) {
        return this.http.post(`${URL}/actions/verificarDataBaixa`, params)
    }
}
