import { ITransacaoContasReceber } from "./TransacaoContasReceber";

export interface ITransacaoTituloInput {
    empresaId: number;
    modulo?: string;
    tipoMovimento?: number;
    situacao?: string;
    tipoBaixa?: string;
}

export interface ITransacaoTituloOutput {
    transacoes: ITransacaoContasReceber;
}

export class TransacaoTituloInput implements ITransacaoTituloInput {
    constructor (
        public empresaId: number,
        public tipoMovimento?: number,
        public modulo?: string,
        public situacao?: string,
        public tipoBaixa?: string,
    ) { }
}