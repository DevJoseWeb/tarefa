import { IEmpresa } from '~src/app/core/models/Empresa';
import { EnumNatureza } from '~src/app/core/enums/enum-natureza';

export interface ITransacaoTransferencia {
    id?: number;
    empresa: IEmpresa;
    descricao: string;
    transacao: string;
    natureza: EnumNatureza;
    isMovimentoBloqueado: boolean;
    isAtualizaProjetos: boolean;
    modulo: string;
    tipoDebito: string;
    aceitaManual: string;
}