export interface IListarContaInternaInput {
    empresaId: number;
    filiaisIds: number[];
    tipoConta: number[];
}

export interface IListarContaInternaOutput {
    contasInternas: IContaInterna[]; //TODO: Mapear
}

export interface IContaInterna {

}

export class ListarContaInterna {
    constructor(
        public empresaId: number,
        public filiaisIds: number[],
        public tipoConta: number[]
    ) {}
}
