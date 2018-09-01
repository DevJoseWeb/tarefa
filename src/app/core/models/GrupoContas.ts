import { IRecPagina } from '~src/app/core/models/RecPagina';
import { EnumTipoAplicacao } from '~src/app/core/enums/enum-tipo-aplicacao';
import { EnumSituacao } from '~src/app/core/enums/enum-situacao';

export interface ObterGrupoContasInput {
    id?: string;
    textoLivre?: string;
    codigosGrupoContas?: string;
    situacao?: EnumSituacao;
    tipoAplicacao?: EnumTipoAplicacao;
    pagina?: IRecPagina;
}

export interface ObterGrupoContasOutput {
    grupoContas: RecGrupoContas;
    totalRegistros: number;
}

export interface RecGrupoContas {
    id: string;
    codigo: string;
    descricao?: string;
    tipoAplicacao?: RecTipoAplicacao;
}

export interface RecTipoAplicacao {
    tipoAplicacao: EnumTipoAplicacao;
    descricao: string;
}
