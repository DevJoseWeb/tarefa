import { EnumTipoPessoa } from "~src/app/core/enums/enum-tipo-pessoa";

export interface IListarFornecedorInput {
    clienteId: number;
    grupoEmpresaId?: string;
}

export interface IListarFornecedorOutput {
    fornecedores: IRecFornecedor;
}

export interface IRecFornecedor {
    idFornecedor?: number;
    nome?: string;
    tipoPessoa?: EnumTipoPessoa;
    numeroDocumento?: string;
    grupoEmpresasId?: string;
    clienteId?: number;
    label: string;
    value: number;
}

export class ListarFornecedorInput {
    constructor(
        public clienteId: number,
        public grupoEmpresaId?: string
    ) {}
}
