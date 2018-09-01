import { EnumSituacao } from "../enums/enum-situacao";
import { IEmpresa } from "./Empresa";

export interface ITransacaoContasReceber {
    id?: number;
    empresa: IEmpresa;
    transacao: string;
    descricao: string;
    modulo: string;
    tipoMovimento: number;
    tipoBaixa: string;
    situacao: EnumSituacao;
    label: string;
    value: number;
}
