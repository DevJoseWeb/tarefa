import { IRecPagina } from "./RecPagina";
import { EnumSituacao } from "../enums/enum-situacao";

export interface IObterFormaPagamentoInput {
    id?: string[];
    textoLivre?: string;
    codigosFormaPagamento?: number[];
    empresasId?: number[];
    situacao?: string;
    liberadaParaVenda?: boolean;
    pagina?: IRecPagina;
}

export interface IObterFormaPagamentoOutput {
    formasPagamento: RecFormaPagamento;
    totalRegistros: number;
}

export interface RecFormaPagamento {
    id: string;
    codigo: number;
    empresaId: number;
    descricao?: string;
    isLiberada?: boolean;
    situacao?: EnumSituacao;
    label: string;
    value: string;
}
