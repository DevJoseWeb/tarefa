import { EnumNatureza } from "~src/app/core/enums/enum-natureza";
import { ITransacaoTransferencia } from "~src/app/core/models/TransacaoTransferencia";
import { IEmpresa } from "~src/app/core/models/Empresa";

export interface IObterTransacaoTesourariaInput {
    empresaId: number;
    modulo?: string;
    natureza?: string;
    transacaoTransferenciaId?: number;
    aceitaManual?: string;
    situacao: string;
}

export interface IObterTransacaoTesourariaOutput {
    transacoesTesouraria: ITransacaoTesouraria[];
}

export interface ITransacaoTesouraria {
    id?: number;
    empresa: IEmpresa;
    descricao: string;
    transacao: string;
    natureza: EnumNatureza;
    isMovimentoBloqueado: boolean;
    isAtualizaProjetos: boolean;
    transacaoTransferencia?: ITransacaoTransferencia;
    modulo: string;
    tipoDebito: string;
    aceitaManual: string;
}

export class TransacaoTesouraria {
    constructor(
        public empresaId: number,
        public situacao: string,
        public modulo?: string,
        public natureza?: string,
        public transacaoTransferenciaId?: number,
        public aceitaManual?: string
    ) {}
}
