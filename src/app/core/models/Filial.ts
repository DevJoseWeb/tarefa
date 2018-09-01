import { IRecPagina } from "~app/core/models/RecPagina"

export interface IPesquisarFilialInput {
    texto?: string;
    empresaId : number;
    pagina: IRecPagina;

}
export interface IPesquisarFilialOutput {
    filiais: IRecFilial;
}

export interface IRecFilial {
    codigo: string;
    id: number;
    nome: string;
    label: string;
    value: number;
}
