export interface IRecFiltroTituloReceberInput {
    dataBaixa: string;
    tipoTituloId?: string[];
    transacaoEntradaId?: number[];
    empresaId: number;
    filiaisIds?: number[];
    filialIdProcessamento?: number;
    clienteId?: number[];
    fornecedorId?: number;
    grupoEmpresaId?: string;
    formaPagamentoId?: string;
    numerosTitulos?: string[];
    dataVencimentoInicial?: string;
    dataVencimentoFinal?: string;
}

export class FiltroTituloBaixar implements IRecFiltroTituloReceberInput {
    constructor(
        public dataBaixa: string,
        public empresaId: number,
        public tipoTituloId: string[],
        public transacaoEntradaId: number[],
        public filiaisIds?: number[],
        public filialIdProcessamento?: number,
        public clienteId?: number[],
        public grupoEmpresaId?: string,
        public formaPagamentoId?: string,
        public numerosTitulos?: string[],
        public dataVencimentoInicial?: string,
        public dataVencimentoFinal?: string,
    ) { }
}

export class FiltroTituloAproveitar {
    constructor(
        public dataBaixa: string,
        public empresaId: number,
        public tipoTituloId?: string[],
        public transacaoEntradaId?: number[],
        public filiaisIds?: number[],
        public clienteId?: number[],
        public grupoEmpresaId?: string,
        public numerosTitulos?: string[],
        public dataVencimentoInicial?: string,
        public dataVencimentoFinal?: string,
    ) { }
}

export class FiltroTituloCompensar {
    constructor(
        public dataBaixa: string,
        public empresaId: number,
        public tipoTituloId?: string[],
        public transacaoEntradaId?: number[],
        public filiaisIds?: number[],
        public fornecedorId?: number[],
        public grupoEmpresaId?: string,
        public numerosTitulos?: string[],
        public dataVencimentoInicial?: string,
        public dataVencimentoFinal?: string,
    ) { }
}
