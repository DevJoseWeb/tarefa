import { EnumSituacao } from "~src/app/core/enums/enum-situacao";

export interface IObterTipoTituloInput {
    tipoAplicacaoIn?: string[];
    situacaoAtivo?: string;
    tipoSoma?: string[];
}

export interface IObterTipoTitulosOutput {
    tiposTitulos: IRecTipoTitulo;
}

export interface IRecTipoTitulo {
    id?: string
    tipoTitulo: string;
    descricao: string;
    somaContasReceber: string;
    somaContasPagar: string;
    aplicacaoTipo: string;
    situacao: EnumSituacao;
    label: string;
    value: string;
}

export class ObterTipoTitulo {
    constructor(
        public tipoAplicacaoIn?: string[],
        public situacaoAtivo?: string,
        public tipoSoma?: string[],
    ) { }
}
