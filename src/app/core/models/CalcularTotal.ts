import { IRecFiltroTituloReceberInput } from "~src/app/core/models/TituloReceber";
import { EnumTipoTotal } from "~src/app/core/enums/enum-tipo-total";

export interface ICalcularTotalInput {
    filtros: IRecFiltroTituloReceberInput;
}

export class CalcularTotal implements ICalcularTotalInput {
    constructor(
        public filtros : IRecFiltroTituloReceberInput,
    ) {}
}