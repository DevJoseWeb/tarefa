import { ITransacaoContasReceber } from "./TransacaoContasReceber";

export interface ITransacaoEntradaTituloInput {
    empresaId: number;
    modulo?: string;
    tipoMovimento?: number;
    situacao?: string;
}

export interface ITransacaoEntradaTituloOutput {
    transacoes: ITransacaoContasReceber;
}

export class TransacaoEntradaTituloInput implements ITransacaoEntradaTituloInput {
    constructor (
        public empresaId: number,
        public tipoMovimento?: number,
        public modulo?: string,
        public tipoBaixa?: string,
        public situacao?: string
    ) { }
}
