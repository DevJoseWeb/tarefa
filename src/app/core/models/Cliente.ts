import { IRecPagina } from '~src/app/core/models/RecPagina';
import { EnumSituacao } from '~src/app/core/enums/enum-situacao';
import { IGruposEmpresas } from '~src/app/core/models/GrupoEmpresa';
import { EnumTipoPessoa } from '~src/app/core/enums/enum-tipo-pessoa';

export interface IObterClienteInput {
    termoBusca?: string;
    clienteId?: number;
    nome?: string;
    numeroDocumento?: number;
    pagina: IRecPagina;
    situacao?: EnumSituacao;
}

export interface IObterClienteOutput {
    clientes: IRecCliente;
    totalRegistros: number;
}

export interface IObterClientesPorGrupoInput {
    grupoId: string;
}

export interface IObterClientesPorGrupoOutput {
    clientes: IRecCliente;
    totalRegistros: number;
}

export interface IRecCliente {
    id: number;
    nome: string;
    numeroDocumento: number;
    numeroDocumentoFormatado? : string;
    grupoEmpresasId?: string;
    tipoPessoa?: EnumTipoPessoa;
    telefone?: string;
    label: string;
    value: number;
}
