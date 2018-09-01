import { Injectable } from "@angular/core";
import { IRecFiltroTituloReceberInput } from "~src/app/core/models/TituloReceber";

@Injectable()

export class CommonTitulosService {
    private empresa: number;
    private filial: number;
    private titulo: any;
    private filialProcessamento: number;
    private filiais: number[] = [46, 47]; //TODO: Alterar para puxar informação do filtro
    private totalDivida: number = 15000; //TODO: Alterar para puxar valor divida
    public filialOptions: any;

    constructor() {}

    public enviaEmpresaId(empresaId: number) {
        return this.empresa = empresaId;
    }
    
    public enviaFilialId(filialId: number) {
        return this.filial = filialId;
    }

    public retornaFilialId() {
        return this.filial;
    }

    public recebeFiltroTitulo(params: IRecFiltroTituloReceberInput) {
        this.titulo = params;
    }

    public filtroTitulo() {
        return this.titulo;
    }

    get empresaId(): number {
        return this.empresa;
    }
    
    get filialProcessamentoId() {
        return this.filialProcessamento;
    }

    set filialProcessamentoId(filial: number) {
        this.filialProcessamento = filial;
    }

    get filiaisId(): number[] {
        return this.filiais;
    }

    set valorDivida(valor: number ) {
        this.totalDivida = valor; 
    }
    
    get valorDivida() {
        return this.totalDivida; 
    }

}